import { ButtonComponent, InputComponent } from "@/ui/index";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";
import { useSendRecoverPasswordEmail } from "@/hook/useSendRecoverPasswordEmail/useSendRecoverPasswordEmail.hook";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Precisa ser um endereço de email válido." }),
});

export type FormFields = z.infer<typeof schema>;

export function SendEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useSendRecoverPasswordEmail();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  return (
    <section
      className="px-8 lg:px-24 min-h-screen flex justify-center items-center"
      data-aos="fade-left"
    >
      <div className="shadow-custom-shadow bg-neutral-800 rounded-3xl h-full w-[50%]">
        <div className="flex flex-col md:flex-row h-full p-8">
          <div className="flex-1 px-4 md:px-14 py-3 flex flex-col justify-center">
            <h2 className="text-5xl font-bold text-white mb-5">
              Recuperar Senha
            </h2>
            <p className="text-md font-light text-white mb-8">
              Digite o seu email abaixo, caso exista, um email será enviado para
              que você troque a sua senha!
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputComponent
                register={{ ...register("email") }}
                classname={errors.email ? "mb-3" : "mb-6"}
                placeholder="Ex.: joao@feevale.com.br"
                type="email"
                id="email"
              >
                Endereço de email
              </InputComponent>
              {errors.email && (
                <div className="text-red-500 text-sm mb-4">
                  {errors.email.message}
                </div>
              )}
              <ButtonComponent
                btnType="submit"
                disabled={isSubmitting}
                classname="w-full mb-2 bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar"
                )}
              </ButtonComponent>
            </form>
            <div className="text-center mt-2">
              <Link
                className="text-white font-light hover:underline w-fit"
                to={"/login"}
              >
                Lembrou sua senha? Entre aqui
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
