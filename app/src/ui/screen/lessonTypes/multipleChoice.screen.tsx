import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetExercise } from "@/hook/useGetExercise/useGetExercise.hook";
import { useGetExerciseOptions } from "@/hook/useGetExerciseOptions/useGetExerciseOptions";
import { ButtonComponent } from "@/ui/component/button/button.component";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getResponseError } from "@/api/error/error.api";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

import happySloth from "@/assets/image/exercise/happy.png";
import sadSloth from "@/assets/image/exercise/sad.png";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { multipleChoice } from "@/api/exercise/multipleChoice.api";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserDataContext } from "@/hook/useDataUserContext/useUserDataContext.hook";

interface ExerciseProps {
  lessonId: number;
}

const schema = z.object({
  answer: z.string({
    required_error: "Selecione uma opção!",
  }),
});

export const MultipleChoice = (props: ExerciseProps) => {
  const { exercise, fetchExercise, exerciseContextLoaded } = useGetExercise(
    props.lessonId
  );
  const { options, fetchExerciseOptions } = useGetExerciseOptions(exercise?.id);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const [open, setOpen] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    fetchExercise();

    if (exerciseContextLoaded) {
      fetchExerciseOptions();
    }
  }, [exerciseContextLoaded]);

  interface ResponseType {
    message: string;
    correct: boolean;
  }

  const [exerciseResponse, setResponse] = useState<ResponseType | null>(null);
  const { refreshUserData } = useUserDataContext();

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      const response = await multipleChoice(exercise?.id, data.answer);
      setResponse(response.data);
      refreshUserData();
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

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
        <h2 className="text-white text-2xl mb-5 italic underline">
          O seu objetivo agora é decidir qual é a opção correta:
        </h2>

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
                  <img className="w-full max-w-[300px]" src={happySloth} alt="Preguiça feliz" />
                  Você pode jogar novamente ou continuar a sua jornada e
                  retornar quando quiser!
                </DialogDescription>
              ) : (
                <DialogDescription className="text-white text-lg text-center flex flex-col items-center">
                  <img className="w-full max-w-[300px]" src={sadSloth} alt="Preguiça triste" />
                  Você pode tentar novamente ou continuar a sua jornada e
                  retornar depois!
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

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {options?.map((option, index) => (
                        <FormItem
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <FormControl>
                            <RadioGroupItem
                              className="peer mt-2 data-[state=checked]:bg-primary-color-dark bg-primary-color text-secondary-color w-5 h-5 border-secondary-color"
                              id={option.content}
                              value={option.content}
                            />
                          </FormControl>
                          <FormLabel
                            className="text-neutral-300 text-xl font-bold cursor-pointer peer-hover:text-white peer-aria-checked:text-secondary-color transition-colors duration-300"
                            htmlFor={option.content}
                          >
                            {option.content}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <section className="text-center mt-10 mb-20">
              <ButtonComponent
                clickEvent={() => navigate("/missoes")}
                btnType="button"
                classname="mt-4 me-6 bg-neutral-200 hover:bg-gray-300 hover:border-white border-neutral-100 text-black w-52"
              >
                Voltar depois
              </ButtonComponent>
              <ButtonComponent
                btnType="submit"
                disabled={isSubmitting}
                clickEvent={!isSubmitting ? () => setOpen(true) : undefined}
                classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Confirmando...
                  </>
                ) : (
                  "Confirmar"
                )}
              </ButtonComponent>
            </section>
          </form>
        </Form>
      </section>
    </>
  );
};
