import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface InputProps {
    children: string;
    type: string;   
    id: string;
    placeholder?: string;
    classname?: string;
}

export const InputComponent = (props: InputProps) => {
    return (
        <div className={`${props.classname} grid w-full gap-4`}>
            <Label className="text-white text-base font-light" htmlFor={props.id}>{props.children}</Label>
            <Input className="placeholder:text-neutral-500 p-6 rounded-2xl text-white border-neutral-500 focus:border-white" type={props.type} id={props.id} placeholder={props.placeholder} />
        </div>
    )
}