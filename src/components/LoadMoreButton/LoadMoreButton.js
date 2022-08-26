import './LoadMoreButton.css';
function LoadMoreButton(props) {
  return (
    <button onClick={props.onClick} className="loadmore-btn">
      Ещё
    </button>
  );
}
export default LoadMoreButton;
