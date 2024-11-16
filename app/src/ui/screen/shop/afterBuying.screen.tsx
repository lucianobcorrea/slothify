import { ButtonComponent } from "@/ui/component/button/button.component";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Confetti from "react-confetti";

export const AfterBuying = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="container flex flex-col text-center items-center min-h-screen justify-center overflow-hidden">
      <Confetti numberOfPieces={500} recycle={false} />
      <h1
        className="text-6xl text-secondary-color font-bold mb-14"
        data-aos="fade-down"
      >
        Compra concluída!
      </h1>

      <h2 className="text-4xl text-white" data-aos="fade-up">
        {location.state.name}
      </h2>
      <img
        data-aos="zoom-in"
        className={`${
          location.state.subtype == "BANNER" ? "py-10 max-w-[550px]" : "max-w-[400px]"
        }`}
        src={location.state.image}
        alt={location.state.name}
      />
      <h2 className="text-white max-w-[60%]" data-aos="fade-up">
        {location.state.description}
      </h2>

      <div data-aos="fade-up" className="flex gap-6 mt-2">
        <ButtonComponent
          clickEvent={() => navigate("/loja")}
          btnType="button"
          classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color mt-10 w-72"
        >
          Continuar
        </ButtonComponent>
      </div>
    </section>
  );
};
