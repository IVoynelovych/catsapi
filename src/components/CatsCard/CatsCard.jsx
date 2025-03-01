import { Component } from "react";

import { CatsCardStyled } from "./CatsCard.styled";
export class CatCard extends Component {
  render() {
    const { breeds, url, id,}= this.props;
    return (
      <CatsCardStyled>
        <img src={url} alt="Cat" width={200}  />
        <p>{breeds.length > 0 ? `Порода: ${breeds[0].name}` : "Порода?"}</p>
      </CatsCardStyled>
    );
}
  }
