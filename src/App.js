import "./App.css";
import PrimarySearchAppBar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/views/Home/Home";
import TextDetail from "./components/TextDetail/TextDetail";
import Writings from "./components/views/Writings/Writings";
import TextsByTag from "./components/TextsByTag/TextsByTag";

function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writings" element={<Writings />} />
        <Route path="/writings/:tag" element={<TextsByTag />} />

        <Route path="/text/:id" element={<TextDetail />} />
      </Routes>
    </div>
  );
}

export default App;
