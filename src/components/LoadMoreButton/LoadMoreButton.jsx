import { ClipLoader } from "react-spinners";
const LoadMoreButton = ({ loading, onLoadMore }) => {
  return (
    <button onClick={!loading ? onLoadMore : null} disabled={loading}>
      {loading ? <ClipLoader size={20} color={"#fff"} /> : "Більше котиків"}
    </button>
  );
};

export default LoadMoreButton;
