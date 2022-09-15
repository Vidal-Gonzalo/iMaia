import "./App.css";
import PrimarySearchAppBar from "./components/Navbar/Navbar";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/views/Home/Home";
import TextDetail from "./components/TextDetail/TextDetail";
import Writings from "./components/views/Writings/Writings";

function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:genre" element={<Writings />}>
          <Route path=":category" element={<Outlet />}>
            <Route path=":tag" element={<Outlet />} />
          </Route>
        </Route>
        <Route path="/text/:id" element={<TextDetail />} />
      </Routes>
    </div>
  );
}

export default App;
