import { useGetExercise } from "@/hook/useGetExercise/useGetExercise.hook";
import {
  useGetExerciseOptions,
  ExerciseOptions,
} from "@/hook/useGetExerciseOptions/useGetExerciseOptions";
import { useEffect, useRef, useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ButtonComponent } from "@/ui/component/button/button.component";
import { useNavigate } from "react-router-dom";

import "aos/dist/aos.css";
import AOS from "aos";

import { Loader2 } from "lucide-react";
import happySloth from "@/assets/image/exercise/happy.png";
import sadSloth from "@/assets/image/exercise/sad.png";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";
import { dragAndDrop } from "@/api/exercise/dragAndDrop.api";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useUserDataContext } from "@/hook/useDataUserContext/useUserDataContext.hook";

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

  interface FinalResult {
    content: string | undefined;
    category: string | undefined;
    droppableId: string;
  }

  const [finalResults, setFinalResults] = useState<FinalResult[]>([]);

  useEffect(() => {
    fetchExercise();

    if (exerciseContextLoaded) {
      fetchExerciseOptions();
    }

    AOS.init({
      duration: 1000,
      once: true,
    });
  }, [exerciseContextLoaded]);

  useEffect(() => {
    if (options) {
      setUnassignedItems(options);

      const initialAssignments: { [key: string]: ExerciseOptions | null } = {};

      const correctOptions = options.filter((opt) => opt.correct === true);

      correctOptions.forEach((_, index) => {
        const pos = `position-${index + 1}`;
        initialAssignments[pos] = null;
      });

      setAssignedItems(initialAssignments);
    }
  }, [options]);

  interface ResponseType {
    message: string;
    correct: boolean;
    xpReward: number;
    coinsReward: number;
  }

  const [open, setOpen] = useState<boolean>(false);
  const [exerciseResponse, setResponse] = useState<ResponseType | null>(null);
  const [loading, setLoading] = useState(false);
  const { refreshUserData } = useUserDataContext();

  const [studyTime, setStudyTime] = useState<string>("");

  const startDateRef = useRef<string>(new Date().toISOString());

  async function onSubmit(request: FinalResult[]): Promise<boolean> {
    if (request.length === 0) {
      toast.error("Arraste todos os blocos antes!");
      return false;
    }
    for (const element of request) {
      if (element.content === undefined || element.category === undefined) {
        toast.error("Arraste todos os blocos antes!");
        return false;
      }
    }
    try {
      const finalDate = new Date().toISOString();
      const response = await dragAndDrop(
        exercise?.id,
        request,
        startDateRef.current,
        finalDate
      );
      setResponse(response.data);

      const startTime = new Date(startDateRef.current);
      const endTime = new Date(finalDate);

      const timeDiff = endTime.getTime() - startTime.getTime();

      const totalSeconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      setStudyTime(formattedTime);

      setLoading(true);
      refreshUserData();
      return true;
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  }

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
                category: assignedItem?.category ?? undefined,
                content: assignedItem?.content ?? undefined,
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          className="sm:max-w-[900px] bg-neutral-850 border-0 focus-visible:outline-none text-white flex flex-col items-center [&>button]:hidden"
        >
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-4xl">
              {exerciseResponse?.correct
                ? "Resposta certa :)"
                : "Resposta incorreta :("}
            </DialogTitle>
            {exerciseResponse?.correct ? (
              <DialogDescription className="text-white text-lg text-center flex flex-col items-center">
                <img
                  className="w-full 2xl:max-w-[300px] max-w-[220px]" 
                  src={happySloth}
                  alt="Preguiça feliz"
                />
                Você pode jogar novamente ou continuar a sua jornada e retornar
                quando quiser!
              </DialogDescription>
            ) : (
              <DialogDescription className="text-white text-lg text-center flex flex-col items-center">
                <img
                  className="w-full 2xl:max-w-[300px] max-w-[220px]"
                  src={sadSloth}
                  alt="Preguiça triste"
                />
                Você pode tentar novamente ou continuar a sua jornada e retornar
                depois!
              </DialogDescription>
            )}

            <div className="grid grid-cols-2 gap-10 pt-5 pb-4">
              {studyTime && (
                <div className="flex flex-col items-center animate-fade-in">
                  <h2 className="text-xl font-bold">Tempo de Resposta</h2>
                  <p className="text-lg">{studyTime}</p>
                </div>
              )}

              <div className="flex flex-col items-center animate-fade-in">
                <h2 className="text-2xl font-bold">Recompensas!</h2>
                <p className="text-lg">XP: {exerciseResponse?.xpReward}</p>
                <p className="text-lg">
                  Moedas: {exerciseResponse?.coinsReward}
                </p>
              </div>
            </div>
          </DialogHeader>

          <DialogFooter>
            <div className="flex gap-6 mt-2">
              <ButtonComponent
                clickEvent={() => window.location.reload()}
                btnType="button"
                classname="bg-neutral-200 hover:bg-gray-300 hover:border-white border-neutral-100 text-black"
              >
                Jogar novamente
              </ButtonComponent>

              <ButtonComponent
                btnType="button"
                clickEvent={() => navigate("/missoes")}
                classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color"
              >
                Concluir
              </ButtonComponent>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section className="container" data-aos="fade-down" data-aos-delay="300">
        <img
          className="w-full max-h-[450px] object-cover"
          src={exercise?.image}
          alt="Imagem do exercício"
        />

        <h2
          data-aos="fade-down"
          className="text-white text-lg mt-10 leading-7"
          dangerouslySetInnerHTML={{ __html: exercise?.statement || "" }}
        />
      </section>

      <section className="container mt-10" data-aos="fade-right">
        <h2 className="text-white text-2xl mb-12 italic underline">
          O seu objetivo agora é arrastar os blocos na ordem correta:
        </h2>

        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex mb-10 gap-10 flex-wrap">
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
          btnType="submit"
          disabled={loading}
          clickEvent={
            !loading
              ? async () => {
                  const success = await onSubmit(finalResults);
                  if (success) {
                    setOpen(true);
                  }
                }
              : undefined
          }
          classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Confirmando...
            </>
          ) : (
            "Confirmar"
          )}
        </ButtonComponent>
      </section>
    </>
  );
};
