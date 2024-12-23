import { useGetArea } from "@/hook/useGetArea/useGetArea";
import { MessageBoxSelect, FormTemplate, LoadingSpinner } from "@/ui/index";
import { useEffect } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormFields } from "./step.screen";
import "aos/dist/aos.css";
import AOS from "aos";

interface AreaProps {
  progress: number;
  clickEventNext: () => void;
  clickEventBack: () => void;
  register: UseFormRegister<FormFields>;
}

export const Area = (props: AreaProps) => {
  const { areas, fetchAreas, loading } = useGetArea();

  useEffect(() => {
    fetchAreas();
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
      message="Escolha suas missões: o que você quer aprender ou melhorar?"
    >
      {loading ? (
        <LoadingSpinner className="text-primary-color" size={46} />
      ) : (
        <div className="grid grid-cols-2 gap-10 mt-20">
          {areas.map((area, index) => {
            return (
              <div key={index} data-aos="fade-up">
                <MessageBoxSelect
                  classname="pt-2 pb-2"
                  value={area.slug}
                  register={props.register("areas")}
                >
                  <div className="flex items-center gap-5 font-medium text-xl">
                    <img
                      src={area.image}
                      alt="image"
                      className="max-w-[90px]"
                    />
                    <h2>{area.title}</h2>
                  </div>
                </MessageBoxSelect>
              </div>
            );
          })}
        </div>
      )}
    </FormTemplate>
  );
};
