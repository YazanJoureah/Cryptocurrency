import Spinner from "react-bootstrap/Spinner";
import "./Loader.css";
export default function Loader() {
  return (
    <div className="Loader">
      <div>
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" size="md" />
      </div>
    </div>
  );
}
