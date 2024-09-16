import { Area, Form, Reason, StudyDay, Tip, StudyDuration } from "@/ui/index";
import { useMultiStepForm } from "@/hook/useMultistepForm/useMultistepForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSaveForm } from "@/hook/useSaveForm/useSaveForm.hook";

const schemaCheckbox = z.object({
  areas: z.array(z.string()).nonempty(),
  reasons: z.array(z.string()).nonempty(),
  studyDay: z.string().min(1),
  studyDuration: z.string().min(1),
});

export type FormFields = z.infer<typeof schemaCheckbox>;

export const Step = () => {

  const onSubmit = useSaveForm();

  const { register, handleSubmit, trigger } = useForm<FormFields>({
    resolver: zodResolver(schemaCheckbox),
    defaultValues: {
      areas: [],
      reasons: [],
    },
  });

  const { step, next, back } = useMultiStepForm([
    <Form clickEvent={() => next()} />,
    <Area
      register={register}
      progress={10}
      clickEventNext={async () => {
        const valid = await trigger("areas");
        if (valid) {
          next();
        } else {
          toast.error("Você deve selecionar pelo menos uma área!");
        }
      }}
      clickEventBack={() => back()}
    />,
    <Reason
      register={register}
      progress={30}
      clickEventNext={async () => {
        const valid = await trigger("reasons");
        if (valid) {
          next();
        } else {
          toast.error("Você deve selecionar pelo menos um motivo!");
        }
      }}
      clickEventBack={() => back()}
    />,
    <StudyDay
      register={register}
      progress={50}
      clickEventNext={async () => {
        const valid = await trigger("studyDay");
        if (valid) {
          next();
        } else {
          toast.error(
            "Você deve selecionar uma sequência de dias para estudar!"
          );
        }
      }}
      clickEventBack={() => back()}
    />,
    <Tip
      progress={70}
      clickEventNext={() => next()}
      clickEventBack={() => back()}
    />,
    <StudyDuration
      register={register}
      progress={100}
      clickEventNext={async () => {
        const valid = await trigger("studyDuration");
        if (valid) {
          next();
        } else {
          toast.error("Você deve selecionar o tempo que você quer dedicar!");
        }
      }}
      clickEventBack={() => back()}
    />,
  ]);

  return <form onSubmit={handleSubmit(onSubmit)}>{step}</form>;
};
