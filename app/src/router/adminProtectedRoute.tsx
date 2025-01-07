import { useAuthContext } from "@/hook/useAuthContext/useAuthContext.hook";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ProtectedRouteProps = PropsWithChildren;

export default function AdminProtectedRoute({ children }: ProtectedRouteProps) {
  const { authUser, isLoggedIn, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      let error = false;

      if (!isLoggedIn || authUser === null) {
        toast.error("Please, login into your account.");
        localStorage.removeItem("token");
        error = true;
      }

      if (authUser?.role != "admin") {
        toast.error("You need to be an admin to access this area!");
        localStorage.removeItem("token");
        error = true;
      }

      if(error) {
        navigate("/", { replace: true });
      }
    }
  }, [navigate, authUser, isLoggedIn, loading]);

  return <>{children}</>;
}
