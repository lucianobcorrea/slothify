import { Area, Form } from "@/ui/index";
import { useMultiStepForm } from "@/hook/useMultistepForm/useMultistepForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const schemaCheckbox = z.object({
  checkboxes: z.array(z.string()).refine((values) => values.some((v) => v), {
    message: "Você deve selecionar pelo menos uma área!",
  }),
});

export type FormFields = z.infer<typeof schemaCheckbox>;

export const Steps = () => {
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schemaCheckbox),
    defaultValues: {
      checkboxes: [],
    },
  });

  const { step, next, back } = useMultiStepForm([
    <Form clickEvent={() => next()} />,
    <Area
      errors={errors}
      register={register}
      progress={10}
      clickEventNext={() => next()}
      clickEventBack={() => back()}
    />,
  ]);

  return <form onSubmit={handleSubmit(onSubmit)}>{step}</form>;
};
