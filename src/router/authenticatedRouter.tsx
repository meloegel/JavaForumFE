import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../account/login";
import Register from "../account/register";
import Home from "../pages/home";

export default function AuthenticatedRouter(): JSX.Element {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
