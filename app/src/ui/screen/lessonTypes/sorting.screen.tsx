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

import { Loader2 } from "lucide-react";
import happySloth from "@/assets/image/exercise/happy.png";
import sadSloth from "@/assets/image/exercise/sad.png";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";
import { sorting } from "@/api/exercise/sorting.api";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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

  interface ResponseType {
    message: string;
    correct: boolean;
  }

  interface FinalResult {
    content: string | undefined;
    correctOrder: number | undefined;
  }

  const [open, setOpen] = useState<boolean>(false);
  const [exerciseResponse, setResponse] = useState<ResponseType | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(request: FinalResult[]): Promise<boolean> {
    try {
      const response = await sorting(exercise?.id, request);
      setResponse(response.data);
      setLoading(true);
      return true;
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  }

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
                  className="w-full max-w-[300px]"
                  src={happySloth}
                  alt="Preguiça feliz"
                />
                Você pode jogar novamente ou continuar a sua jornada e retornar
                quando quiser!
              </DialogDescription>
            ) : (
              <DialogDescription className="text-white text-lg text-center flex flex-col items-center">
                <img
                  className="w-full max-w-[300px]"
                  src={sadSloth}
                  alt="Preguiça triste"
                />
                Você pode tentar novamente ou continuar a sua jornada e retornar
                depois!
              </DialogDescription>
            )}
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
          btnType="submit"
          disabled={loading}
          clickEvent={
            !loading
              ? async () => {
                  const success = await onSubmit(items);
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
