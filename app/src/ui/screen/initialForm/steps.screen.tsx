import { useLocation } from "react-router-dom";
import { Area } from "@/ui/index";

export const Steps = () => {
  const location = useLocation();

  return <>{location.state.step === "area" && <Area progress={10} />}</>;
};
