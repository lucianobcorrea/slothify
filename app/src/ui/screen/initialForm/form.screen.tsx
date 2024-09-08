import { ProgressComponent, MessageBox, ButtonComponent } from "@/ui/index";
import writingSloth from "@/assets/image/initialForm/writing-sloth.svg";
import { useNavigate } from "react-router-dom";

export function Form() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="container mt-16">
        <ProgressComponent progressValue={0} />
        <div className="flex justify-center mt-24">
          <img
            className="w-full max-w-72"
            src={writingSloth}
            alt="Preguiça com o pelo roxo, segurando uma caneta e um papel, olhando para o usuário enquanto escreve"
          />
        </div>
        <div className="flex w-full justify-center">
          <MessageBox classname="mt-14 font-medium italic text-lg w-[55%]">
            “Você está prestes a transformar sua rotina e vencer a
            procrastinação de uma vez por todas. Construa sua jornada, uma
            tarefa de cada vez, e veja seu progresso se tornar realidade! O
            aprendizado pode ser divertido, envolvente e eficaz.”
          </MessageBox>
        </div>
      </div>

      <hr className="border-neutral-500 mt-24" />
      <div className="flex justify-center items-center mt-11">
        <ButtonComponent
          clickEvent={() =>
            navigate(`/bem-vindo/area`, { state: { step: "area" } })
          }
          btnType="button"
          classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color"
        >
          Vamos Começar?
        </ButtonComponent>
      </div>
    </section>
  );
}
