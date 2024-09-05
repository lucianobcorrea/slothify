import { Button } from "@/components/ui/button"

export interface ButtonProps {
    children: string;
    classname: string;
}

export const ButtonComponent = (props: ButtonProps) => {
    return <Button className={`${props.classname} font-medium text-base border-[1px] px-10 py-6 rounded-2xl`}>{props.children}</Button>
}