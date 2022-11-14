import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DisplayData from "./components/DisplayData";
function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route />
          <Route path="/" element={<DisplayData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
