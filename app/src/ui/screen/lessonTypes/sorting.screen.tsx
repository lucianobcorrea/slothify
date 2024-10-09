import { useGetExercise } from "@/hook/useGetExercise/useGetExercise.hook";
import { useGetExerciseOptions } from "@/hook/useGetExerciseOptions/useGetExerciseOptions";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "@/ui/component/button/button.component";

interface ExerciseProps {
  lessonId: number;
}

interface Option {
  id: number;
  content: string;
  correctOrder: number;
}

interface SortableItemProps {
  id: number;
  content: string;
}

const SortableItem = ({ id, content }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-6 rounded-md text-neutral-700 bg-white h-full flex items-center text-xl mb-3"
    >
      {content}
    </div>
  );
};

export const Sorting = (props: ExerciseProps) => {
  const { exercise, fetchExercise, exerciseContextLoaded } = useGetExercise(
    props.lessonId
  );
  const { options, fetchExerciseOptions } = useGetExerciseOptions(exercise?.id);
  const [items, setItems] = useState<Option[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExercise();

    if (exerciseContextLoaded) {
      fetchExerciseOptions();
    }
  }, [exerciseContextLoaded]);

  useEffect(() => {
    if (options) {
      setItems(options);
    }
  }, [options]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setItems((items) => {
      const oldIndex = items.findIndex(
        (item) => item.correctOrder === active.id
      );
      const newIndex = items.findIndex((item) => item.correctOrder === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

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

      <section className="container mt-10 mb-10">
        <h2 className="text-white text-2xl mb-12 italic underline">
          O seu objetivo agora é decidir a ordem correta:
        </h2>

        <div className="flex flex-col">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item) => item.correctOrder)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((option, index) => (
                <SortableItem
                  key={index}
                  id={option.correctOrder}
                  content={option.content}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </section>

      <section className="container text-center mt-10 mb-20">
        <ButtonComponent
          clickEvent={() => navigate("/missoes")}
          btnType="button"
          classname="mt-4 me-6 bg-neutral-200 hover:bg-gray-300 hover:border-white border-neutral-100 text-black w-52"
        >
          Voltar depois
        </ButtonComponent>
        <ButtonComponent
          classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color mt-12 w-52"
          btnType="button"
        >
          Confirmar
        </ButtonComponent>
      </section>
    </>
  );
};
