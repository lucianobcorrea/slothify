import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps {
  children: string;
  type: string;
  id: string;
  placeholder?: string;
  classname?: string;
  register?: UseFormRegisterReturn;
  labelClassName?: string;
  inputClassName?: string;
}

export const InputComponent = (props: InputProps) => {
  return (
    <div className={`${props.classname} grid w-full gap-4`}>
      <Label
        className={`${
          props.labelClassName && props.labelClassName !== ""
            ? props.labelClassName
            : "text-white"
        } text-base font-light`}
      >
        {props.children}
      </Label>
      <Input
        className={`${
          props.inputClassName && props.inputClassName !== ""
            ? props.inputClassName
            : "text-white"
        } placeholder:text-neutral-500 p-6 rounded-2xl text-base border-neutral-500 focus:border-white`}
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        {...props.register}
      />
    </div>
  );
};
