import "./App.css";
import PrimarySearchAppBar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/views/Home/Home";
import TextDetail from "./components/TextDetail/TextDetail";

function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text/:id" element={<TextDetail />} />
      </Routes>
    </div>
  );
}

export default App;
