import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/auth.context";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" />
    </AuthProvider>
  );
}

export default App;
