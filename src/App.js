import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import Post from "./components/Post/Post";
import Comment from "./components/Comment/Comment";
import Nav from "./components/Nav/Nav";

export default function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/" element={<Post />} />
        <Route path="/comment" element={<Comment />} />
      </Routes>
    </div>
  );
}
