import Banner from "@/assets/image/register/banner.png";
import { ButtonComponent, InputComponent } from "@/ui/index"

export function Register() {
  return (
    <section className="p-6 lg:p-12 min-h-screen flex justify-center items-center">
      <div className="shadow-custom-shadow bg-neutral-800 rounded-3xl h-full w-full">
        <div className="flex flex-col md:flex-row h-full p-6">
          <div className="relative md:w-[60%] rounded-3xl overflow-hidden">
            <img
              className="object-cover h-100 w-full brightness-50 blur-[1px]"
              src={Banner}
              alt="Banner na cor roxa com uma lua, montanhas e árvores de fundo"
            />
            <div className="absolute inset-0 flex flex-col justify-center text-white p-16">
              <h2 className="text-5xl font-bold leading-tight">
                Faça cada minuto
                <br /> valer a pena.
                <br /> Comece agora.
              </h2>
            </div>
          </div>

          <div className="flex-1 px-4 md:px-14 py-6">
            <h1 className="text-5xl text-white font-bold mb-4">Comece agora</h1>
            <p className="text-white font-light text-xl mb-14">
              Insira os seus dados abaixo e acabe com a procrastinação.
            </p>

            <InputComponent classname="mb-6" placeholder="Ex.: joao@feevale.com.br" type="email" id="email">Endereço de email</InputComponent>
            <InputComponent classname="mb-6" placeholder="Ex.: lucianobcorrea" type="text" id="nickname">Nickname</InputComponent>
            <InputComponent classname="mb-6" placeholder="••••••••" type="password" id="password">Senha</InputComponent>
            <InputComponent classname="mb-8" placeholder="••••••••" type="password" id="rePassword">Repetir senha</InputComponent>
            <ButtonComponent classname="w-full mb-4 bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color">Criar conta</ButtonComponent>
            <div className="text-center mt-2">
              <a
                href="#/"
                className="text-white font-light hover:underline w-fit"
              >
                Ja possui conta? Entrar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
