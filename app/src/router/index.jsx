import { createBrowserRouter } from "react-router-dom";
import { Login, Register } from "../ui/index.js";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registrar",
    element: <Register />,
  },
]);
