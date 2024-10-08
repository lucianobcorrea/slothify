import { createBrowserRouter } from "react-router-dom";
import {
  Login,
  Register,
  Home,
  Step,
  Menu,
  Profile,
  Missions,
  ChooseType,
  Explanation,
} from "../ui/index.ts";
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
    path: "/",
    element: <Home />,
  },
  {
    path: "/bem-vindo",
    element: (
      <ProtectedRoute>
        <Step />
      </ProtectedRoute>
    ),
  },
  {
    path: "/menu",
    element: (
      <ProtectedRoute>
        <Menu />
      </ProtectedRoute>
    ),
  },
  {
    path: "/perfil",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/missoes",
    element: (
      <ProtectedRoute>
        <Missions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/exercicio",
    element: (
      <ProtectedRoute>
        <ChooseType />
      </ProtectedRoute>
    ),
  },
  {
    path: "/explicacao",
    element: (
      <ProtectedRoute>
        <Explanation />
      </ProtectedRoute>
    ),
  },
]);
