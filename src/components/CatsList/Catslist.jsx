import { useState, useEffect } from "react";
import api from "../../api";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { CatCard } from "../CatsCard/CatsCard";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import { CatslistStyled } from "./CatsList.Styled";
export const CatsList = () => {
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    const getCats = async () => {
      await loadCats();
      await loadBreeds();
    };
    getCats();
  }, []);
  const loadCats = async () => {
    setLoading(true);
    try {
      const data = await api.getCats();
      setLoading(false);
      setFirstLoad(false);
      setCats((prevState) => (filter ? data : [...prevState, ...data]));
      if (data.length === 0) {
        toast.error("Нових котиків нема");
      } else {
        toast.success("Більше котиків");
      }
    } catch (error) {
      toast.error("Помилка");
      setLoading(false);
    }
  };

  const loadBreeds = async () => {
    try {
      const breeds = await api.getBreeds();
      setBreeds(breeds);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBreedChange = async (event) => {
    const breedName = event.target.value.toLowerCase();
    const breed = breeds.find((b) => b.name.toLowerCase().includes(breedName));
    if (!breed) {
      toast.error("Порода не знайдена");
      return;
    }
    setLoading(true);
    setFilter(breed.id);
    setCats([]);
    try {
      const data = await api.getCatsByBreed(breed.id);
      setCats(data);
      setLoading(false);
      if (data.length === 0) {
        toast.error("Котів нема");
      } else {
        toast.success("Знайшли");
      }
    } catch (error) {
      toast.error("Помилка");
      setLoading(false);
    }
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <input
        type="text"
        placeholder="Введіть породу..."
        onChange={handleBreedChange}
      />

      <CatslistStyled>
        {cats.map((cat) => (
          <CatCard key={cat.id} id={cat.id} breeds={cat.breeds} url={cat.url} />
        ))}
      </CatslistStyled>

      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        {cats.length > 0 && (
          <LoadMoreButton onLoadMore={loadCats} loading={loading} />
        )}
      </div>

      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <ClipLoader size={50} color={"#36d7b7"} />
        </div>
      )}
    </>
  );
};
