import { useGetExercise } from "@/hook/useGetExercise/useGetExercise.hook";
import { useEffect } from "react";

interface exerciseProps {
  lessonId: number;
}

export const MultipleChoice = (props: exerciseProps) => {
  const { exercise, fetchExercise } = useGetExercise(props.lessonId);

  useEffect(() => {
    fetchExercise();
  }, []);

  return (
    <section className="container">
      <img className="w-full" src={exercise?.image} alt="Imagem do exercício" />

      <h2
        className="text-white mt-10"
        dangerouslySetInnerHTML={{ __html: exercise?.statement || "" }}
      />
    </section>
  );
};
