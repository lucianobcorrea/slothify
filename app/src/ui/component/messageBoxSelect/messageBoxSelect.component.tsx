import { ChangeEventHandler, ReactNode } from "react";

interface MessageBoxProps {
  classname?: string;
  children: ReactNode;
  name: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
}

export const MessageBoxSelect = (props: MessageBoxProps) => {
  return (
    <div className="select-none">
      <input
        onChange={props.handleChange}
        type="checkbox"
        name={props.name}
        id={props.value}
        className="hidden peer"
        value={props.value}
        checked={props.checked}
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
