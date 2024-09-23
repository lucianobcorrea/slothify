import { useAuthContext } from "@/hook/useAuthContext/useAuthContext.hook";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authUser, isLoggedIn, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn || authUser === null) {
        toast.error("Por favor, entre na sua conta.");
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    }
  }, [navigate, authUser, isLoggedIn, loading]);

  return <>{children}</>;
}
