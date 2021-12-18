import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../account/login";
import Register from "../account/register";
import AddTopic from "../pages/addTopic";
import Home from "../pages/home";
import Profile from "../account/profile";
import Forum from "../pages/topicForum";
import AddComment from "../pages/addComment";

export default function AuthenticatedRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-topic" element={<AddTopic />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forum/:id" element={<Forum />} />
        <Route path="/add-comment/:id" element={<AddComment />} />
      </Routes>
    </BrowserRouter>
  );
}
