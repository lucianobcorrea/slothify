import journey from "@/assets/image/home/journey.png";
import slothify from "@/assets/image/home/slothify.png";
import howItWorks from "@/assets/image/home/smart-sloth.png";
import shopSloth from "@/assets/image/home/shop-sloth.png";
import { ButtonComponent } from "@/ui/component/button/button.component";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    Aos.init();
  });

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/registrar");
  };

  return (
    <>
      <section className="container">
        <div
          className="grid grid-cols-2 gap-12 mt-44"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <img
            className="max-w-xl w-full"
            src={shopSloth}
            alt="Uma preguiça ao lado de um baú segurando uma saco de dinheiro"
          />

          <div className="text-white flex flex-col justify-center w-fit">
            <h1 className="text-[42px] font-bold mb-2">Comece Sua Jornada</h1>
            <h2>Sua jornada para superar a procrastinação começa aqui.</h2>
            <ButtonComponent
              clickEvent={() => goToRegister()}
              btnType="button"
              classname="mt-8 bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color"
            >
              Começar agora
            </ButtonComponent>

            <ButtonComponent
              clickEvent={() => goToLogin()}
              btnType="button"
              classname="mt-4 bg-neutral-200 hover:bg-gray-300 hover:border-white border-neutral-100 text-black"
            >
              Continuar jornada
            </ButtonComponent>
          </div>
        </div>
      </section>

      <hr className="border-neutral-800 mt-20 mb-20" />

      <section className="container">
        <div className="grid grid-cols-2 gap-12">
          <div
            className="text-white flex flex-col justify-center"
            data-aos="fade-left"
            data-aos-once="true"
            data-aos-offset="600"
          >
            <h2 className="text-[42px] font-bold mb-2">
              Transforme seu Aprendizado em uma Jornada Épica
            </h2>
            <h3 className="text-2xl font-medium">
              Deixe a procrastinação para trás e embarque em uma aventura de
              aprendizado envolvente e divertida.
            </h3>
          </div>

          <div data-aos="fade-right" data-aos-once="true" data-aos-offset="600">
            <img
              className="max-w-xl w-full"
              src={journey}
              alt="Uma preguiça roxa segurando uma tocha com a lua e um castelo no fundo"
            />
          </div>
        </div>
      </section>

      <hr className="border-neutral-800 mt-20 mb-20" />

      <section className="container">
        <div className="grid grid-cols-2 gap-12">
          <div
            data-aos="fade-right"
            data-aos-once="true"
            data-aos-offset="1100"
          >
            <img
              className="max-w-xl w-full"
              src={slothify}
              alt="Uma preguiça roxa segurando um mapa com diversos itens atrás dela, como livros, árvore, troféu..."
            />
          </div>

          <div
            className="text-white flex flex-col justify-center"
            data-aos="fade-left"
            data-aos-once="true"
            data-aos-offset="1100"
          >
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
        </div>
      </section>

      <hr className="border-neutral-800 mt-20 mb-20" />

      <section className="container">
        <div
          className="grid grid-cols-2 gap-12"
          data-aos="zoom-in-down"
          data-aos-once="true"
          data-aos-offset="1000"
        >
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

          <img
            className="w-full max-w-xl"
            src={howItWorks}
            alt="Uma preguiça roxa inteligente utilizando óculos"
          />
        </div>
      </section>

      <hr className="border-neutral-800 mt-20 mb-20" />

      <section className="container mb-20">
        <h2
          className="text-white font-medium text-[42px] mb-2"
          data-aos="fade-left"
          data-aos-once="true"
          data-aos-offset="1100"
        >
          Principais recursos
        </h2>
        <h3
          className="text-white text-2xl font-medium"
          data-aos="fade-left"
          data-aos-once="true"
          data-aos-offset="1100"
        >
          Aprender nunca foi tão divertido.
        </h3>

        <ul className="leading-9 pl-5 grid grid-cols-2 text-white text-2xl font-medium mt-12 gap-16 list-disc marker:text-primary-color-dark">
          <div>
            <li
              className="mb-10"
              data-aos="fade-left"
              data-aos-once="true"
              data-aos-offset="1100"
            >
              <span className="font-bold text-primary-color-dark">
                Gamificação Personalizada:
              </span>{" "}
              Desafios, missões e recompensas projetados para se adaptar ao seu
              ritmo e estilo de aprendizado, tornando cada progresso único e
              recompensador.
            </li>
            <li
              data-aos="fade-left"
              data-aos-once="true"
              data-aos-offset="1100"
            >
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
            <li
              className="mb-10"
              data-aos="fade-right"
              data-aos-once="true"
              data-aos-offset="1100"
            >
              <span className="font-bold text-primary-color-dark">
                Storytelling Imersivo:
              </span>{" "}
              Transforme seu aprendizado em uma jornada épica. Cada lição se
              torna um capítulo empolgante da sua história rumo à superação da
              procrastinação e ao sucesso.
            </li>
            <li
              data-aos="fade-right"
              data-aos-once="true"
              data-aos-offset="1100"
            >
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
