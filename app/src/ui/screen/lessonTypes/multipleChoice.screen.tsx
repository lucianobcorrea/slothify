import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetExercise } from "@/hook/useGetExercise/useGetExercise.hook";
import { useGetExerciseOptions } from "@/hook/useGetExerciseOptions/useGetExerciseOptions";
import { useEffect } from "react";

interface ExerciseProps {
  lessonId: number;
}

export const MultipleChoice = (props: ExerciseProps) => {
  const { exercise, fetchExercise, exerciseContextLoaded } = useGetExercise(
    props.lessonId
  );
  const { options, fetchExerciseOptions } = useGetExerciseOptions(exercise?.id);

  useEffect(() => {
    fetchExercise();

    if (exerciseContextLoaded) {
      fetchExerciseOptions();
    }
  }, [exerciseContextLoaded]);

  return (
    <>
      <section className="container">
        <img
          className="w-full max-h-[450px] object-cover"
          src={exercise?.image}
          alt="Imagem do exercício"
        />

        <h2
          className="text-white text-lg mt-10 leading-7"
          dangerouslySetInnerHTML={{ __html: exercise?.statement || "" }}
        />
      </section>

      <section className="container mt-10">
        <h2 className="text-white text-2xl mb-5 italic underline">O seu objetivo agora é decidir qual é a opção correta:</h2>
        <RadioGroup>
          {options?.map((option, index) => {

            return (
              <div className="flex items-center space-x-2 mb-1" key={index}>
                <RadioGroupItem
                  className="peer bg-primary-color text-secondary-color w-5 h-5 border-secondary-color"
                  value={option.content}
                  id={option.content}
                />
                <Label
                  className="text-neutral-300 text-xl font-bold cursor-pointer peer-hover:text-white peer-aria-checked:text-secondary-color transition-colors duration-300"
                  htmlFor={option.content}
                >
                  {option.content}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </section>
    </>
  );
};
