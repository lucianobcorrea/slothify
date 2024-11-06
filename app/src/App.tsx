import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/auth.context";
import { UserDataProvider } from "./context/userData.context";

function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <RouterProvider router={router} />
        <ToastContainer theme="dark" />
      </UserDataProvider>
    </AuthProvider>
  );
}

export default App;
