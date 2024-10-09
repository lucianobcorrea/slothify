import { useState, useEffect } from "react";
import { ButtonComponent } from "@/ui/component/button/button.component";
import { useLocation, useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import writingSloth from "@/assets/image/initialForm/writing-sloth.svg";

interface KeyPoint {
  content: string;
}

export const Explanation = () => {
  const location = useLocation();
  const [animationStage, setAnimationStage] = useState("initial");
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1000 });

    const timer = setTimeout(() => {
      setAnimationStage("final");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative container p-12 bg-neutral-850 text-white rounded-lg shadow-lg flex flex-col mt-12 mb-12 border border-neutral-700">
      <div
        className="absolute top-0 left-0 transition-transform duration-1000 ease-in-out"
        style={{
          transform:
            animationStage === "initial"
              ? "translate(calc(45vw - 100%), calc(50vh - 55%)) scale(1)"
              : "translate(10px, calc(100vh - 92%)) translateX(-90px) scale(0.333)",
          width: animationStage === "initial" ? "24rem" : "24rem",
        }}
      >
        <img
          src={writingSloth}
          alt="Preguiça Escrevendo"
          className={`w-full h-full ${
            animationStage === "initial" ? "animate-image-zoom" : "animate-sway"
          }`}
        />
      </div>

      <div
        className={`${
          animationStage === "initial" ? "opacity-0" : "opacity-100"
        } transition-opacity duration-1000 delay-500`}
      >
        <h1
          className="text-4xl font-bold text-primary-color mb-4"
          data-aos="fade-up"
        >
          {location.state.explanation.title}
        </h1>
        <h2
          className="text-2xl font-semibold text-primary-color-dark mb-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {location.state.explanation.objective}
        </h2>

        <div className="mb-6" data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-xl font-semibold text-secondary-color mb-3">
            Pontos Chave
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-white">
            {(location.state.explanation.keyPoints as KeyPoint[]).map(
              (keyPoint: KeyPoint, index: number) => (
                <li
                  key={index}
                  className="text-lg"
                  data-aos="fade-up"
                  data-aos-delay={`${300 + index * 100}`}
                >
                  {keyPoint.content}
                </li>
              )
            )}
          </ul>
        </div>

        <div
          className="bg-neutral-750 p-4 rounded-lg mb-6"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <h3 className="text-lg font-semibold text-white mb-3">Exemplo</h3>
          <div
            className="text-base"
            dangerouslySetInnerHTML={{
              __html: location.state.explanation.example,
            }}
          ></div>
        </div>

        <div
          className="p-4 bg-neutral-750 rounded-lg"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <h3 className="text-lg font-semibold text-white mb-3">Dica</h3>
          <p className="text-base text-white">
            {location.state.explanation.tip}
          </p>
        </div>

        <div className="text-center" data-aos="fade-up" data-aos-delay="700">
          <ButtonComponent
            clickEvent={() => navigate("/missoes")}
            btnType="button"
            classname="mt-4 me-6 bg-neutral-200 hover:bg-gray-300 hover:border-white border-neutral-100 text-black w-52"
          >
            Voltar
          </ButtonComponent>

          <ButtonComponent
            clickEvent={() =>
              navigate("/exercicio", {
                state: {
                  lessonId: location.state.explanation.lesson_id,
                  exerciseType: location.state.explanation.exerciseType,
                },
              })
            }
            btnType="button"
            classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color mt-12 w-52"
          >
            Continuar
          </ButtonComponent>
        </div>
      </div>
    </section>
  );
};
