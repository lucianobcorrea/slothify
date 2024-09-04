import Banner from "../../../assets/image/register/banner.png";

export function Register() {
  return (
    <section className="p-6 lg:p-20 min-h-screen flex justify-center items-center">
      <div className="shadow-custom-shadow bg-gray-1000 rounded-20 h-full w-full">
        <div className="flex flex-col md:flex-row h-full p-6">
          <div className="relative md:w-[60%] h-60 md:h-full rounded-20 overflow-hidden">
            <img
              className="object-cover w-full h-full brightness-50 blur-[1px]"
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

          <div className="flex-1 px-4 md:px-14 py-10">
            <h1 className="text-5xl text-white font-bold mb-4">Comece agora</h1>
            <p className="text-white font-light text-xl mb-20">
              Insira os seus dados abaixo e acabe com a procrastinação.
            </p>

            <div className="text-center mt-3">
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
