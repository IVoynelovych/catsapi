import { CatsCardStyled } from "./CatsCard.styled";
export const CatCard = ({ breeds, url, id }) => {
  return (
    <CatsCardStyled>
      <img src={url} alt="Cat" width={200} />
      <p>{breeds.length > 0 ? `Порода: ${breeds[0].name}` : "Порода?"}</p>
    </CatsCardStyled>
  );
};
