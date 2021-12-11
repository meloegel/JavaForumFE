import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../account/login";


export default function AuthenticatedRouter():JSX.Element {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />

        </Routes>
      </BrowserRouter>
    );
}