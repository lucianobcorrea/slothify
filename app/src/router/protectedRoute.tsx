import { useAuthContext } from "@/hook/useAuthContext/useAuthContext.hook";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authUser, setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser === null) {
      toast.error("Por favor, entre na sua conta.");
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  }, [navigate, authUser]);

  return children;
}
