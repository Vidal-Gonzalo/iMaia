import "./App.css";
import PrimarySearchAppBar from "./components/Navbar/Navbar";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/views/Home/Home";
import TextDetail from "./components/views/TextDetail/TextDetail";
import Writings from "./components/views/Writings/Writings";
import Search from "./components/views/Search/Search";

function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:genre" element={<Writings />}>
          <Route path=":tag" element={<Outlet />} />
        </Route>
        <Route
          path="/user/:user"
          element={
            <div
              style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              somt
            </div>
          }
        />
        <Route path="/search/:filter" element={<Search />}>
          <Route path=":element" element={<Outlet />} />
        </Route>
        <Route path="/text/:id" element={<TextDetail />} />
      </Routes>
    </div>
  );
}

export default App;
