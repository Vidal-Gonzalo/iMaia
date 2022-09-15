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
        <Route
          path="writings"
          element={<Writings clasification={"writings"} />}
        >
          <Route path=":category" element={<Outlet />}>
            <Route path=":tag" element={<Outlet />} />
          </Route>
        </Route>
        <Route path="poems" element={<Writings clasification={"poems"} />}>
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
