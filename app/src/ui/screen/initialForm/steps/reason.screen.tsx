import { UseFormRegister } from "react-hook-form";
import { FormFields } from "./step.screen";
import { useGetReason } from "@/hook/useGetReason/useGetReason";
import { useEffect } from "react";
import { MessageBoxSelect } from "@/ui/component/messageBoxSelect/messageBoxSelect.component";
import { FormTemplate } from "@/ui/component/initialForm/form.component";
import { LoadingSpinner } from "@/ui/component/spinner/spinner.component";
import "aos/dist/aos.css";
import AOS from "aos";

interface ReasonProps {
  progress: number;
  clickEventNext: () => void;
  clickEventBack: () => void;
  register: UseFormRegister<FormFields>;
}

export const Reason = (props: ReasonProps) => {
  const { reasons, fetchReasons, loading } = useGetReason();

  useEffect(() => {
    fetchReasons();
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <FormTemplate
      clickEventNext={props.clickEventNext}
      clickEventBack={props.clickEventBack}
      progress={props.progress}
      buttonTxt="Avançar"
      message="Você quer aprender essas áreas para..."
    >
      {loading ? (
        <LoadingSpinner className="text-primary-color" size={46} />
      ) : (
        <div className="grid grid-cols-2 gap-10 mt-20">
          {reasons.map((reason, index) => (
            <div key={index} data-aos="fade-up">
              <MessageBoxSelect
                classname="pt-2 pb-2"
                value={reason.slug}
                register={props.register("reasons")}
              >
                <div className="flex items-center gap-5 font-medium text-xl">
                  <img
                    src={reason.image}
                    alt="image"
                    className="max-w-[90px]"
                  />
                  <h2>{reason.title}</h2>
                </div>
              </MessageBoxSelect>
            </div>
          ))}
        </div>
      )}
    </FormTemplate>
  );
};
