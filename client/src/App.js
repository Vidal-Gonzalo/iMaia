import Navbar from "./components/Navbar/Navbar";
import Introduction from "./components/views/Introduction/Introduction";
import TextDetail from "./components/views/TextDetail/TextDetail";
import Writings from "./components/views/Writings/Writings";
import Search from "./components/views/Search/Search";
import Profile from "./components/views/Profile/Profile";
import Auth from "./components/views/Auth/Auth";
import Settings from "./components/views/Settings/Settings";
import Home from "./components/views/Home/Home";
import Post from "./components/views/Post/Post";
import PostNavbar from "./components/PostNavbar/PostNavbar";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import ProtectedRoute from "./utils/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Write from "./components/views/Post/Write/Write";

function App() {
  const location = useLocation();
  const userLogged = useSelector((state) => state.auth.user);
  console.log(location.pathname.includes("/write"));

  return (
    <div className="App">
      {location.pathname.includes("/write") ? <PostNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Introduction />} />
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
        <Route element={<ProtectedRoute userLogged={userLogged} />}>
          <Route element={<Home />} path="/home" />
        </Route>
        <Route element={<ProtectedRoute userLogged={userLogged} />}>
          <Route path="/write" element={<Post />}>
            <Route path="text" element={<Write />} />
          </Route>
          {/* <Route element={<Post />} path="/write" /> */}
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
