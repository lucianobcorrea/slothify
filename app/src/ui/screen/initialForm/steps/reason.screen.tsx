import { MessageBoxSelect, FormTemplate } from "@/ui/index";

import briefcase from "@/assets/image/initialForm/briefcase.svg";

interface ReasonProps {
  progress: number;
}

export const Reason = (props: ReasonProps) => {
  return (
    <FormTemplate
      routeBack="/bem-vindo/area"
      routeBackState={{ step: "area" }}
      routeStep="/bem-vindo/reason"
      routeStepState={{ step: "reason" }}
      progress={props.progress}
      buttonTxt="Avançar"
      message="Escolha suas missões: o que você quer aprender ou melhorar?"
    >
      <MessageBoxSelect
        classname="pt-2 pb-2"
        name="area"
        value="Avançar na carreira profissional"
      >
       
      </MessageBoxSelect>
    </FormTemplate>
  );
};
