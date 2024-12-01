import { FormTemplate } from "@/ui/component/initialForm/form.component";
import smartSloth from "@/assets/image/initialForm/smart-sloth.png";
import lamp from "@/assets/image/initialForm/lamp.png";
import { MessageBox } from "@/ui/component/messageBox/messageBox.component";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

interface TipProps {
  progress: number;
  clickEventNext: () => void;
  clickEventBack: () => void;
}

export const Tip = (props: TipProps) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <FormTemplate
      clickEventNext={() => props.clickEventNext()}
      clickEventBack={() => props.clickEventBack()}
      progress={props.progress}
      buttonTxt="Avançar"
    >
      <div className="flex flex-col justify-center items-center h-full mt-6">
        <img data-aos="zoom-in"
          className="max-w-96 animate-swaySlow"
          src={smartSloth}
          alt="Preguiça com óculos como se estivesse dando uma dica"
        />
        <div className="relative flex justify-center w-[60%]" data-aos="fade-down">
          <img className="max-w-20 absolute left-[-40px] top-[-24px] rotate-6" src={lamp} alt="Lâmpada" />
          <MessageBox classname="text-lg">
            “Estudar de forma consistente, seja por poucos minutos diários ou
            concentrando seu tempo em blocos, cria uma rotina poderosa: você
            aprende de forma contínua e aumenta a retenção do que estudou,
            transformando cada esforço focado em grandes resultados!”
          </MessageBox>
        </div>
      </div>
    </FormTemplate>
  );
};
