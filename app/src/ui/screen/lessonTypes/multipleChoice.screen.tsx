import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetExercise } from "@/hook/useGetExercise/useGetExercise.hook";
import { useGetExerciseOptions } from "@/hook/useGetExerciseOptions/useGetExerciseOptions";
import { useEffect } from "react";

interface exerciseProps {
  lessonId: number;
}

export const MultipleChoice = (props: exerciseProps) => {
  const { exercise, fetchExercise } = useGetExercise(props.lessonId);
  const { exerciseOptions, fetchExerciseOptions } = useGetExerciseOptions(
    Number(exercise?.id)
  );

  useEffect(() => {
    fetchExercise();
    fetchExerciseOptions();
  }, []);

  return (
    <>
      <section className="container">
        <img
          className="w-full"
          src={exercise?.image}
          alt="Imagem do exercício"
        />

        <h2
          className="text-white mt-10"
          dangerouslySetInnerHTML={{ __html: exercise?.statement || "" }}
        />
      </section>

      <section className="container">
        <RadioGroup>
          <div className="flex items-center space-x-2 mb-1">
            <RadioGroupItem
              className="peer bg-primary-color text-primary-color-darker w-5 h-5 border-secondary-color"
              value="option-one"
              id="option-one"
            />
            <Label
              className="text-neutral-300 text-xl font-bold cursor-pointer peer-hover:text-white peer-aria-checked:text-white transition-colors duration-300"
              htmlFor="option-one"
            >
              Option One
            </Label>
          </div>

          <div className="flex items-center space-x-2 mb-1">
            <RadioGroupItem
              className="peer bg-primary-color text-primary-color-darker w-5 h-5 border-secondary-color"
              value="option-two"
              id="option-two"
            />
            <Label
              className="text-neutral-300 text-xl font-bold cursor-pointer peer-hover:text-white peer-aria-checked:text-white transition-colors duration-300"
              htmlFor="option-two"
            >
              Option Two
            </Label>
          </div>
        </RadioGroup>
      </section>
    </>
  );
};
