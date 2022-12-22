import PrimarySearchAppBar from "./components/Navbar/Navbar";
import { Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/views/Home/Home";
import TextDetail from "./components/views/TextDetail/TextDetail";
import Writings from "./components/views/Writings/Writings";
import Search from "./components/views/Search/Search";
import Profile from "./components/views/Profile/Profile";
import Auth from "./components/views/Auth/Auth";
import Settings from "./components/views/Settings/Settings";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";

function App() {
  const userLogged = useSelector((state) => state.auth.user);

  return (
    <div className="App">
      <PrimarySearchAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:genre" element={<Writings />}>
          {/* Use outletContext */}
          <Route path=":tag" element={<Outlet />} />
        </Route>
        <Route path="/user/:username" element={<Profile />} />
        <Route path="/search/:filter" element={<Search />}>
          <Route path=":element" element={<Outlet />} />
        </Route>
        <Route path="/text/:id" element={<TextDetail />} />
        <Route path="/login" element={<Auth />} />
        <Route element={<ProtectedRoute userLogged={userLogged} />}>
          <Route element={<Settings />} path="/settings" />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
