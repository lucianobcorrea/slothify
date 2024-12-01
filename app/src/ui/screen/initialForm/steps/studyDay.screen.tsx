import { UseFormRegister } from "react-hook-form";
import { FormFields } from "./step.screen";
import { FormTemplate } from "@/ui/component/initialForm/form.component";
import { MessageBoxRadio } from "@/ui/component/messageBoxRadio/messageBoxRadio.component";

import everyDay from "@/assets/image/initialForm/every-day.png";
import week from "@/assets/image/initialForm/week.png";
import weekend from "@/assets/image/initialForm/weekend.png";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

interface StudyDaysProps {
  progress: number;
  clickEventNext: () => void;
  clickEventBack: () => void;
  register: UseFormRegister<FormFields>;
}

export const StudyDay = (props: StudyDaysProps) => {
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
      message="Como você vai querer completar sua missão?"
    >
      <div className="grid grid-cols-2 gap-10 mt-20" data-aos="fade-up">
        <MessageBoxRadio
          classname="pt-2 pb-2"
          value="EVERY_DAY"
          register={props.register("studyDay")}
        >
          <div className="flex items-center gap-5 font-medium text-xl">
            <img src={everyDay} alt="Todos os dias" className="max-w-[90px]" />
            <h2>Todos os dias</h2>
          </div>
        </MessageBoxRadio>

        <MessageBoxRadio
          classname="pt-2 pb-2"
          value="WEEK"
          register={props.register("studyDay")}
        >
          <div className="flex items-center gap-5 font-medium text-xl">
            <img src={week} alt="Todos os dias" className="max-w-[90px]" />
            <h2>Durante a semana</h2>
          </div>
        </MessageBoxRadio>

        <MessageBoxRadio
          classname="pt-2 pb-2"
          value="WEEKEND"
          register={props.register("studyDay")}
        >
          <div className="flex items-center gap-5 font-medium text-xl">
            <img src={weekend} alt="Todos os dias" className="max-w-[90px]" />
            <h2>Final de semana</h2>
          </div>
        </MessageBoxRadio>
      </div>
    </FormTemplate>
  );
};
