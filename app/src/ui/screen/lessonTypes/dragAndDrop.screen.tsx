import { useGetExercise } from "@/hook/useGetExercise/useGetExercise.hook";
import {
  useGetExerciseOptions,
  ExerciseOptions,
} from "@/hook/useGetExerciseOptions/useGetExerciseOptions";
import { useEffect, useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ButtonComponent } from "@/ui/component/button/button.component";
import { useNavigate } from "react-router-dom";

interface ExerciseProps {
  lessonId: number;
}

interface DraggableItemProps {
  option: ExerciseOptions;
  droppableId: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  option,
  droppableId,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: option.category,
    data: {
      option,
      droppableId,
    },
  });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 rounded-md text-neutral-700 bg-white h-full flex items-center text-xl justify-center"
    >
      {option.content}
    </div>
  );
};

interface DroppableAreaProps {
  id: string;
  children?: React.ReactNode;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? "#D4B3F7" : "#A855F7",
    border: "1px solid #D4B3F7",
    padding: "20px",
    minHeight: "140px",
    marginBottom: "10px",
    borderRadius: "10px",
    height: "100%",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export const DragAndDrop = (props: ExerciseProps) => {
  const { exercise, fetchExercise, exerciseContextLoaded } = useGetExercise(
    props.lessonId
  );

  const navigate = useNavigate();

  const { options, fetchExerciseOptions } = useGetExerciseOptions(exercise?.id);

  const [assignedItems, setAssignedItems] = useState<{
    [key: string]: ExerciseOptions | null;
  }>({});
  const [unassignedItems, setUnassignedItems] = useState<ExerciseOptions[]>([]);

  const [finalResults, setFinalResults] = useState({});
  console.log(finalResults);
  useEffect(() => {
    fetchExercise();

    if (exerciseContextLoaded) {
      fetchExerciseOptions();
    }
  }, [exerciseContextLoaded]);

  useEffect(() => {
    if (options) {
      setUnassignedItems(options);

      const initialAssignments: { [key: string]: ExerciseOptions | null } = {};

      const correctOptions = options.filter((opt) => opt.correct === true);

      correctOptions.forEach((opt, index) => {
        const pos = `position-${index + 1}`;
        initialAssignments[pos] = null;
      });

      setAssignedItems(initialAssignments);
    }
  }, [options]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over) {
      const category = active.id;
      const fromDroppableId = active.data.current?.droppableId;
      const toDroppableId = over.id;

      if (fromDroppableId && toDroppableId) {
        const item = options?.find((opt) => opt.category === category);

        if (item) {
          setAssignedItems((prev) => {
            const newAssignments = { ...prev };

            const itemAtDestination = newAssignments[toDroppableId];

            if (itemAtDestination && toDroppableId !== "unassigned") {
              setUnassignedItems((prevUnassigned) => [
                ...prevUnassigned,
                itemAtDestination,
              ]);
            }

            if (fromDroppableId !== "unassigned") {
              newAssignments[fromDroppableId] = null;
            } else {
              setUnassignedItems((prevUnassigned) =>
                prevUnassigned.filter((i) => i.category !== category)
              );
            }

            if (toDroppableId !== "unassigned") {
              newAssignments[toDroppableId] = item;
            } else {
              setUnassignedItems((prevUnassigned) => [...prevUnassigned, item]);
            }

            const assignments = Object.entries(newAssignments)
              .filter(([assignedItem]) => assignedItem !== null)
              .map(([droppableId, assignedItem]) => ({
                droppableId,
                category: assignedItem?.category,
                content: assignedItem?.content,
              }));

            setFinalResults(assignments);

            return newAssignments;
          });
        }
      }
    }
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

      <section className="container mt-10">
        <h2 className="text-white text-2xl mb-12 italic underline">
          O seu objetivo agora é arrastar os blocos na ordem correta:
        </h2>

        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex mb-10 gap-10">
            {unassignedItems.map((item) => (
              <DraggableItem
                key={item.category}
                option={item}
                droppableId="unassigned"
              />
            ))}
          </div>

          <div className="flex gap-10 mb-10">
            {Object.entries(assignedItems).map(([key, value]) => (
              <div className="w-full" key={key}>
                <DroppableArea id={key}>
                  {value && <DraggableItem option={value} droppableId={key} />}
                </DroppableArea>
              </div>
            ))}
          </div>
        </DndContext>
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
