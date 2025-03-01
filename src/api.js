import axios from "axios";

const API_URL = "https://api.thecatapi.com/v1/";
const API_KEY = "live_s1mHDvuHvviSJtKxkIhdnF9wEo2QG4uwU0D3t5W21dqDEJtMvQTdDeJCWQ8ef4aA";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["x-api-key"] = API_KEY;

const getCats = async () => {
  try {
    const res = await axios.get("images/search?limit=12");
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getCatsByBreed = async (breedId) => {
  try {
    const res = await axios.get("images/search", {
      params: { limit: 10, breed_ids: breedId },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getBreeds = async () => {
  try {
    const res = await axios.get("breeds");
    return res.data; 
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default { getCats, getCatsByBreed, getBreeds };
