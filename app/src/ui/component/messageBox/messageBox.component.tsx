import { ReactNode } from "react";

interface MessageBoxProps {
  classname?: string;
  children: ReactNode;
}

export const MessageBox = (props: MessageBoxProps) => {
  return (
    <div
      className={`${props.classname} bg-neutral-750 text-white p-6 rounded-xl border-[1px] border-neutral-500`}
    >
      {props.children}
    </div>
  );
};
