import Spinner from "react-bootstrap/Spinner";
export default function Loader() {
  return (
    <div className="Loader">
      <div className="spinner">
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" size="md" />
      </div>
    </div>
  );
}
