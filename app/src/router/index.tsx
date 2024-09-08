import { createBrowserRouter } from "react-router-dom";
import { Login, Register, Home, Form, Steps } from "../ui/index.ts";

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
    element: <Home />,
  },
  {
    path: "/bem-vindo",
    element: <Form />,
  },
  {
    path: "/bem-vindo/:step",
    element: <Steps />,
  },
]);
