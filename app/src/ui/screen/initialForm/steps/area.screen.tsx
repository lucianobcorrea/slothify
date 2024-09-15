import { useGetAreas } from "@/hook/useGetAreas/useGetAreas";
import { MessageBoxSelect, FormTemplate } from "@/ui/index";
import { useEffect } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormFields } from "./steps.screen";
import { toast } from "react-toastify";

interface AreaProps {
  progress: number;
  clickEventNext: () => void;
  clickEventBack: () => void;
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
}

export const Area = (props: AreaProps) => {
  const { areas, fetchAreas } = useGetAreas();

  useEffect(() => {
    fetchAreas();
  }, []);

  useEffect(() => {
    if (props.errors.checkboxes) {
      toast.error(props.errors.checkboxes.message);
    }
  }, [props.errors.checkboxes]);
  
  return (
    <FormTemplate
      clickEventNext={() => props.clickEventNext()}
      clickEventBack={() => props.clickEventBack()}
      progress={props.progress}
      buttonTxt="Avançar"
      message="Escolha suas missões: o que você quer aprender ou melhorar?"
    >
      <div className="grid grid-cols-2 gap-10 mt-20">
        {areas.map((area, index) => {
          return (
            <div key={index}>
              <MessageBoxSelect
                classname="pt-2 pb-2"
                value={area.slug}
                register={props.register("checkboxes")}
              >
                <div className="flex items-center gap-5 font-medium text-xl">
                  <img src={area.image} alt="image" className="max-w-[90px]" />
                  <h2>{area.title}</h2>
                </div>
              </MessageBoxSelect>
            </div>
          );
        })}
      </div>
    </FormTemplate>
  );
};
