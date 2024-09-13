import { useLocation } from "react-router-dom";
import { Area, Reason } from "@/ui/index";

export const Steps = () => {
  const location = useLocation();
  console.log(location);
  return <>
  
  {location.state.step === "area" && <Area progress={10} />}
  {location.state.step === "reason" && <Reason progress={20} />}
  </>;
};
