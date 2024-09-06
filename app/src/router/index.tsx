import { createBrowserRouter } from "react-router-dom";
import { Login, Register, Home } from "../ui/index.ts";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registrar",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home/>
  }
]);
