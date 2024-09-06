import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  classname: string;
  btnType: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const ButtonComponent = (props: ButtonProps) => {
  return (
    <Button
      disabled={props.disabled}
      type={props.btnType}
      className={`${props.classname} font-medium text-base border-[1px] px-10 py-6 rounded-2xl`}
    >
      {props.children}
    </Button>
  );
};
