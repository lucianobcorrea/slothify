import { UseFormRegister } from "react-hook-form";
import { FormFields } from "./step.screen";
import { useGetReason } from "@/hook/useGetReason/useGetReason";
import { useEffect } from "react";
import { MessageBoxSelect } from "@/ui/component/messageBoxSelect/messageBoxSelect.component";
import { FormTemplate } from "@/ui/component/initialForm/form.component";

interface ReasonProps {
  progress: number;
  clickEventNext: () => void;
  clickEventBack: () => void;
  register: UseFormRegister<FormFields>;
}

export const Reason = (props: ReasonProps) => {
  const { reasons, fetchReasons } = useGetReason();

  useEffect(() => {
    fetchReasons();
  }, []);

  return (
    <FormTemplate
      clickEventNext={() => props.clickEventNext()}
      clickEventBack={() => props.clickEventBack()}
      progress={props.progress}
      buttonTxt="Avançar"
      message="Você quer aprender essas áreas para..."
    >
      <div className="grid grid-cols-2 gap-10 mt-20">
        {reasons.map((reasons, index) => {
          return (
            <div key={index}>
              <MessageBoxSelect
                classname="pt-2 pb-2"
                value={reasons.slug}
                register={props.register("reasons")}
              >
                <div className="flex items-center gap-5 font-medium text-xl">
                  <img
                    src={reasons.image}
                    alt="image"
                    className="max-w-[90px]"
                  />
                  <h2>{reasons.title}</h2>
                </div>
              </MessageBoxSelect>
            </div>
          );
        })}
      </div>
    </FormTemplate>
  );
};
