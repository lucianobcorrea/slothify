import { useGetAreas } from "@/hook/useGetAreas/useGetAreas";
import { MessageBoxSelect, FormTemplate } from "@/ui/index";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AreaProps {
  progress: number;
}

export const Area = (props: AreaProps) => {
  const navigate = useNavigate();
  const { areas, fetchAreas } = useGetAreas();

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <FormTemplate
      progress={props.progress}
      buttonTxt="Avançar"
      message="Escolha suas missões: o que você quer aprender ou melhorar?"
    >
      <div className="grid grid-cols-2 gap-10 mt-20">
        {areas.map((area) => {
          return (
            <div>
              <MessageBoxSelect classname="pt-2 pb-2" name="area" slug={area.slug}>
                <div className="flex items-center gap-5 font-medium text-xl">
                  <img src={area.image} alt="image" />
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
