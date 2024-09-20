import { Header } from "@/ui/component/header/header.component";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Main = (props: LayoutProps) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};
