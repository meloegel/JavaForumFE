import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../account/login";
import Register from "../account/register";
import AddTopic from "../pages/addTopic";
import Home from "../pages/home";

export default function AuthenticatedRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-topic" element={<AddTopic />} />
      </Routes>
    </BrowserRouter>
  );
}
