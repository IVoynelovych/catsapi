import { Component } from "react";
import api from "../../api";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { CatCard } from "../CatsCard/CatsCard";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import { CatslistStyled } from "./CatsList.Styled";

export class CatsList extends Component {
  state = {
    cats: [],
    breeds: [], 
    filter: "", 
    loading: false,
    firstLoad: true,
  };

  async componentDidMount() {
    this.loadCats();
    this.loadBreeds(); 
  }

  loadCats = async () => {
    this.setState({ loading: true });
  
    try {
      const data = await api.getCats();
      this.setState((prevState) => ({
        cats: [...prevState.cats, ...data], 
        loading: false,
        firstLoad: false,
      }));
  
      if (data.length === 0) {
        toast.error("Нових котиків нема");
      } else {
        toast.success("Більше котиків");
      }
    } catch (error) {
      toast.error("Помилка");
      this.setState({ loading: false });
    }
  };
  

  loadBreeds = async () => {
    try {
      const breeds = await api.getBreeds(); 
      this.setState({ breeds });
    } catch (error) {
      console.error( error);
    }
  };

  handleBreedChange = async (event) => {
    const breedName = event.target.value.toLowerCase();
    const breed = this.state.breeds.find((b) => b.name.toLowerCase().includes(breedName));
    if (!breed) {
      toast.error("Порода не знайдена");
      return;
    }
    this.setState({ loading: true, filter: breed.id, cats: [] }); 
  
    try {
      const data = await api.getCatsByBreed(breed.id);
      this.setState({ cats: data, loading: false });
  
      if (data.length === 0) {
        toast.error("Котів нема");
      } else {
        toast.success("Знайшли");
      }
    } catch (error) {
      toast.error("Помилка");
      this.setState({ loading: false });
    }
  };
  

  render() {
    return (
      <>
        <Toaster position="top-right" reverseOrder={false} />

        <input
          type="text"
          placeholder="Введіть породу..."
          onChange={this.handleBreedChange}
        />

        <CatslistStyled>
          {this.state.cats.map((cat) => (
            <CatCard key={cat.id} id={cat.id} breeds={cat.breeds} url={cat.url} />
          ))}
        </CatslistStyled>

        <div style={{ position: "fixed", bottom: "20px", right:'20px' }}>
            {this.state.cats.length > 0 && (
              <LoadMoreButton onLoadMore={this.loadCats} loading={this.state.loading} />
            )}
        </div>

        {this.state.loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <ClipLoader size={50} color={"#36d7b7"} />
          </div>
        )}
      </>
    );
  }
}
