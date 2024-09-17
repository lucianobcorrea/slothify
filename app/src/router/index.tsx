import { createBrowserRouter } from "react-router-dom";
import { Login, Register, Home, Step } from "../ui/index.ts";
import ProtectedRoute from "./protectedRoute.tsx";

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
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bem-vindo",
    element: (
      <ProtectedRoute>
        <Step />
      </ProtectedRoute>
    ),
  },
]);
