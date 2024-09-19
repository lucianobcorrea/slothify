import journey from "@/assets/image/home/journey.png";
import slothify from "@/assets/image/home/slothify.png";
import howItWorks from "@/assets/image/home/how-it-works.png";

export function Home() {
  return (
    <>
      <header className="bg-neutral-750 border-neutral-500 border-b-[1px] h-28"></header>
      <section className="container">
        <div className="grid grid-cols-2 gap-12 mt-20">
          <img
            className="max-w-xl w-full"
            src={journey}
            alt="Uma preguiça roxa segurando uma tocha com a lua e um castelo no fundo"
          />

          <div className="text-white flex flex-col justify-center">
            <h2 className="text-[42px] font-bold mb-2">
              Transforme seu Aprendizado em uma Jornada Épica
            </h2>
            <h3 className="text-2xl font-medium">
              Deixe a procrastinação para trás e embarque em uma aventura de
              aprendizado envolvente e divertida.
            </h3>
          </div>
        </div>
      </section>

      <hr className="border-neutral-500 mt-20 mb-20" />

      <section className="container">
        <div className="grid grid-cols-2 gap-12">
          <div className="text-white flex flex-col justify-center">
            <h2 className="font-medium text-[42px] mb-2">
              O que é o {""}
              <span className="font-bold text-primary-color-dark">
                Slothify
              </span>
              ?
            </h2>

            <h3 className="mb-8 text-2xl font-medium">
              Uma plataforma inovadora que combina aprendizado ativo com o
              storytelling para combater a procrastinação.
            </h3>

            <h3 className="text-2xl font-medium">
              Combinamos técnicas de gamificação comprovadas com uma narrativa
              envolvente para tornar seu aprendizado mais agradável.
            </h3>
          </div>

          <img
            className="max-w-xl w-full"
            src={slothify}
            alt="Uma preguiça roxa segurando um mapa com diversos itens atrás dela, como livros, árvore, troféu..."
          />
        </div>
      </section>

      <hr className="border-neutral-500 mt-20 mb-20" />

      <section className="container">
        <div className="grid grid-cols-2 gap-12">
          <img
            className="w-full max-w-xl"
            src={howItWorks}
            alt="Uma preguiça roxa inteligente utilizando óculos"
          />

          <div className="flex flex-col justify-center text-white">
            <div className="mb-8">
              <h2 className="font-medium text-[42px] mb-2">Como funciona?</h2>
              <h3 className="text-2xl font-medium">
                Nossa plataforma utiliza elementos de storytelling para
                transformar seu aprendizado em uma aventura. Cada lição é um
                novo capítulo, repleto de desafios e recompensas até chegar na
                missão final.
              </h3>
            </div>

            <div>
              <h2 className="font-medium text-[42px] mb-2">
                O Poder da Gamificação
              </h2>
              <h3 className="text-2xl font-medium">
                A gamificação torna cada etapa do seu aprendizado
                recompensadora. Progredir se torna mais do que uma obrigação,
                vira uma experiência divertida.
              </h3>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-neutral-500 mt-20 mb-20" />

      <section className="container mb-20">
        <h2 className="text-white font-medium text-[42px] mb-2">
          Principais recursos
        </h2>
        <h3 className="text-white text-2xl font-medium">
          Aprender nunca foi tão divertido.
        </h3>

        <ul className="leading-9 pl-5 grid grid-cols-2 text-white text-2xl font-medium mt-12 gap-16 list-disc marker:text-primary-color-dark">
          <div>
            <li className="mb-10">
              <span className="font-bold text-primary-color-dark">
                Gamificação Personalizada:
              </span>{" "}
              Desafios, missões e recompensas projetados para se adaptar ao seu
              ritmo e estilo de aprendizado, tornando cada progresso único e
              recompensador.
            </li>
            <li>
              <span className="font-bold text-primary-color-dark">
                Loja de Itens e Personalizações:
              </span>{" "}
              Aproveite a loja do jogo para adquirir itens utilizáveis que podem
              ajudar em sua jornada, além de avatares, banners e outras opções
              de personalização. Deixe seu perfil com a sua cara e torne sua
              experiência ainda mais divertida e envolvente.
            </li>
          </div>

          <div>
            <li className="mb-10">
              <span className="font-bold text-primary-color-dark">
                Storytelling Imersivo:
              </span>{" "}
              Transforme seu aprendizado em uma jornada épica. Cada lição se
              torna um capítulo empolgante da sua história rumo à superação da
              procrastinação e ao sucesso.
            </li>
            <li>
              <span className="font-bold text-primary-color-dark">
                Feedback imediato:
              </span>{" "}
              Receba feedback instantâneo sobre seu progresso e celebre cada
              conquista com incentivos que mantêm você motivado e focado em suas
              metas definidas.
            </li>
          </div>
        </ul>
      </section>
    </>
  );
}
