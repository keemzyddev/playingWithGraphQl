import "./App.css";
import DisplayData from "./components/DisplayData";
import DisplayMovies from "./components/DisplayMovies";
function App() {
  return (
    <div className="container">
      <DisplayData />
      <hr />
      <hr />
      <DisplayMovies />
    </div>
  );
}

export default App;
