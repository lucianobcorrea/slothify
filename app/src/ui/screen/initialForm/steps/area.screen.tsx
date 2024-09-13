import { useGetAreas } from "@/hook/useGetAreas/useGetAreas";
import { MessageBoxSelect, FormTemplate } from "@/ui/index";
import { ChangeEvent, useEffect, useState } from "react";

interface AreaProps {
  progress: number;
}

export const Area = (props: AreaProps) => {
  const { areas, fetchAreas } = useGetAreas();
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;

    setSelectedAreas((prevSelected) => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((area) => area !== value);
      }
    });
  }

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <FormTemplate
      routeBack="/bem-vindo"
      routeStep="/bem-vindo/reason"
      routeStepState={{ step: "reason" }}
      progress={props.progress}
      buttonTxt="Avançar"
      message="Escolha suas missões: o que você quer aprender ou melhorar?"
    >
      <div className="grid grid-cols-2 gap-10 mt-20">
        {areas.map((area) => {
          return (
            <div>
              <MessageBoxSelect
                handleChange={handleChange}
                classname="pt-2 pb-2"
                name="area"
                value={area.slug}
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
