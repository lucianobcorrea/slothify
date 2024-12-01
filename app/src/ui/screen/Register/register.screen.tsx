import Banner from "@/assets/image/register/banner.png";
import { ButtonComponent, InputComponent } from "@/ui/index";
import { useForm } from "react-hook-form";
import { useRegister } from "@/hook/useRegister/useRegister.hook";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

const schema = z
  .object({
    email: z
      .string()
      .email({ message: "Precisa ser um endereço de email válido." }),
    password: z
      .string()
      .min(8, { message: "A senha precisa ter pelo menos 8 caracteres" }),
    rePassword: z.string().min(8),
    username: z
      .string()
      .min(3, { message: "O usuário precisa ter pelo menos 3 caracteres" }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "As senhas precisam ser iguais.",
    path: ["rePassword"],
  });

export type FormFields = z.infer<typeof schema>;

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useRegister();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  return (
    <section
      className="px-8 lg:px-24 min-h-screen flex justify-center items-center"
      data-aos="fade-left"
    >
      <div className="shadow-custom-shadow bg-neutral-800 rounded-3xl h-full w-full">
        <div className="flex flex-col md:flex-row h-full p-8">
          <div className="relative md:w-[50%] rounded-3xl overflow-hidden">
            <img
              className="object-cover h-full w-full brightness-50 blur-[1px]"
              src={Banner}
              alt="Banner na cor roxa com uma lua, montanhas e árvores de fundo"
            />
            <div className="absolute inset-0 flex flex-col justify-center text-white p-16">
              <h1 className="text-5xl font-bold leading-tight">
                Faça cada minuto
                <br /> valer a pena.
                <br /> Inicie sua Jornada.
              </h1>
              <h2 className="text-white font-light text-xl mt-2">
                Insira os seus dados ao lado
                <br />e acabe com a procrastinação.
              </h2>
            </div>
          </div>

          <div className="flex-1 px-4 md:px-14 py-3 flex flex-col justify-center">
            <h2 className="text-5xl font-bold text-white mb-8">
              Comece Agora.
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputComponent
                register={register("email")}
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
              <InputComponent
                register={register("username")}
                classname={errors.username ? "mb-3" : "mb-6"}
                placeholder="Ex.: lucianobcorrea"
                type="text"
                id="username"
              >
                Nome de Usuário
              </InputComponent>
              {errors.username && (
                <div className="text-red-500 text-sm mb-4">
                  {errors.username.message}
                </div>
              )}
              <InputComponent
                register={register("password")}
                classname={errors.password ? "mb-3" : "mb-6"}
                placeholder="••••••••"
                type="password"
                id="password"
              >
                Senha
              </InputComponent>
              {errors.password && (
                <div className="text-red-500 text-sm mb-4">
                  {errors.password.message}
                </div>
              )}
              <InputComponent
                register={register("rePassword")}
                classname={errors.rePassword ? "mb-3" : "mb-10"}
                placeholder="••••••••"
                type="password"
                id="rePassword"
              >
                Repetir senha
              </InputComponent>
              {errors.rePassword && (
                <div className="text-red-500 text-sm mt-4 mb-10">
                  {errors.rePassword.message}
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
                    Criando conta...
                  </>
                ) : (
                  "Criar conta"
                )}
              </ButtonComponent>
            </form>
            <div className="text-center mt-2">
              <Link
                className="text-white font-light hover:underline w-fit"
                to={"/login"}
              >
                Ja possui conta? Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
