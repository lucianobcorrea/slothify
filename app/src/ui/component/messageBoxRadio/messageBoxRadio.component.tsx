import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface MessageBoxProps {
  classname?: string;
  children: ReactNode;
  value: string;
  register: UseFormRegisterReturn;
}

export const MessageBoxRadio = (props: MessageBoxProps) => {
  return (
    <div className="select-none">
      <input
        type="radio"
        id={props.value}
        className="hidden peer"
        value={props.value}
        {...props.register}
      />
      <div
        className={`${props.classname} bg-neutral-750 text-white p-6 rounded-xl border-[1px] border-neutral-500
        peer-checked:border-primary-color hover:border-primary-color peer-checked:scale-[1.01] hover:scale-[1.01] transition-transform duration-200`}
      >
        <label className="hover:cursor-pointer" htmlFor={props.value}>
          {props.children}
        </label>
      </div>
    </div>
  );
};
