import { useGetStudyDuration } from "@/hook/useGetStudyDuration/useGetStudyDuration";
import { FormTemplate } from "@/ui/component/initialForm/form.component";
import { useEffect } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormFields } from "./step.screen";
import { MessageBoxRadio } from "@/ui/component/messageBoxRadio/messageBoxRadio.component";

interface StudyDurationProps {
  progress: number;
  clickEventNext: () => void;
  clickEventBack: () => void;
  register: UseFormRegister<FormFields>;
}

interface Duration {
  FIVE_MINUTES: string;
  TEN_MINUTES: string;
  FIFTEEN_MINUTES: string;
  TWENTY_MINUTES: string;
}

export const StudyDuration = (props: StudyDurationProps) => {
  const { studyDurations, fetchStudyDurations } = useGetStudyDuration();

  useEffect(() => {
    fetchStudyDurations();
  }, []);

  const durationDisplayMap: Duration = {
    FIVE_MINUTES: "5 minutos",
    TEN_MINUTES: "10 minutos",
    FIFTEEN_MINUTES: "15 minutos",
    TWENTY_MINUTES: "20 minutos",
  };

  return (
    <FormTemplate
      clickEventNext={() => props.clickEventNext()}
      clickEventBack={() => props.clickEventBack()}
      progress={props.progress}
      buttonTxt="Finalizar"
      message="Quanto tempo do seu dia você quer dedicar para completar a sua missão com sucesso?"
    >
      <div className="grid grid-cols-2 gap-10 mt-20">
        {studyDurations.map((studyDuration, index) => {
          return (
            <div key={index}>
              <MessageBoxRadio
                classname="pt-2 pb-2"
                value={studyDuration.duration}
                register={props.register("studyDuration")}
              >
                <div className="flex items-center gap-5 font-medium text-xl">
                  <img
                    src={studyDuration.image}
                    alt="image"
                    className="max-w-[90px]"
                  />
                  <h2>{durationDisplayMap[studyDuration.duration]}</h2>
                </div>
              </MessageBoxRadio>
            </div>
          );
        })}
      </div>
    </FormTemplate>
  );
};
