import { MessageBox, FormTemplate } from "@/ui/index";
import { useNavigate } from "react-router-dom";

interface AreaProps {
  progress: number;
}

export const Area = (props: AreaProps) => {
  const navigate = useNavigate();

  return (
    <FormTemplate
      progress={props.progress}
      buttonTxt="Avançar"
      message="Escolha suas missões: o que você quer aprender ou melhorar?"
    >
        
    </FormTemplate>
  );
};
