import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetExercise } from "@/hook/useGetExercise/useGetExercise.hook";
import { useGetExerciseOptions } from "@/hook/useGetExerciseOptions/useGetExerciseOptions";
import { ButtonComponent } from "@/ui/component/button/button.component";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ExerciseProps {
  lessonId: number;
}

const schema = z.object({
  selectedOption: z.string({
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

  useEffect(() => {
    fetchExercise();

    if (exerciseContextLoaded) {
      fetchExerciseOptions();
    }
  }, [exerciseContextLoaded]);

  function onSubmit(data: z.infer<typeof schema>) {
    console.log(JSON.stringify(data, null, 2));
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="selectedOption"
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
                classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color mt-12 w-52"
                btnType="submit"
              >
                Confirmar
              </ButtonComponent>
            </section>
          </form>
        </Form>
      </section>
    </>
  );
};
