import { Component } from "react";
import { ClipLoader } from "react-spinners";
class LoadMoreButton extends Component {
  render() {
    const { loading } = this.props;
    if (!loading) {
      return <button onClick={this.props.onLoadMore} >Більше котиків</button>;
    }
    if (loading) {
      return(<button>
        <ClipLoader size={50} color={"#36d7b7"} />
      </button>)
    }
  }
}

export default LoadMoreButton;
