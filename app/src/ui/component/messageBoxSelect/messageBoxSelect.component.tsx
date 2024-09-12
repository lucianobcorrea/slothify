import { ReactNode } from "react";

interface MessageBoxProps {
  classname?: string;
  children: ReactNode;
  name: string;
  slug: string;
}

export const MessageBoxSelect = (props: MessageBoxProps) => {
  return (
    <div className="select-none">
      <input
        type="checkbox"
        name={props.name}
        id={props.slug}
        className="hidden peer"
        value={props.slug}
      />
      <div
        className={`${props.classname} bg-neutral-750 text-white p-6 rounded-xl border-[1px] border-neutral-500
        peer-checked:border-primary-color peer-checked:scale-[1.01] transition-transform duration-200`}
      >
        <label className="hover:cursor-pointer" htmlFor={props.slug}>
          {props.children}
        </label>
      </div>
    </div>
  );
};
