import { useEffect } from "react";
import api from "../../api";
import { Component } from "react";
import { CatsList } from "../CatsList/Catslist";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
class App extends Component {
  render(){
    return (
      <>
        <CatsList/>
      </>
    );
  }
  
}

export default App;
