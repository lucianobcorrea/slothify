import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import coin from "@/assets/image/general/coin.png";
import fire from "@/assets/image/general/fire.png";
import { useUserDataContext } from "@/hook/useDataUserContext/useUserDataContext.hook";

export const Menu = () => {
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  const { userData, } = useUserDataContext();

  return (
    <section className="h-screen w-full flex justify-center items-center p-6">
      <div className="grid grid-cols-6 grid-rows-6 gap-6 h-full w-full text-3xl text-white font-bold">
        <Link
          to="/missoes"
          className="col-span-3 row-span-3"
          data-aos="fade-up"
        >
          <div className="h-full w-full bg-neutral-800 rounded-3xl flex justify-start items-end p-8 border border-transparent hover:border-neutral-600 hover:scale-[1.01] transition-transform duration-300 ease-in-out">
            Missões
          </div>
        </Link>

        <Link
          to="/"
          className="col-span-3 row-span-3"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="h-full w-full bg-neutral-800 rounded-3xl flex justify-start items-end p-8 border border-transparent hover:border-neutral-600 hover:scale-[1.01] transition-transform duration-300 ease-in-out">
            Institucional
          </div>
        </Link>

        <Link
          to="/ranking"
          className="col-span-3 row-span-2"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="h-full w-full bg-neutral-800 rounded-3xl flex justify-start items-end p-8 border border-transparent hover:border-neutral-600 hover:scale-[1.01] transition-transform duration-300 ease-in-out">
            Ranking
          </div>
        </Link>

        <Link
          to="/loja"
          className="col-span-2 row-span-8"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="h-full w-full bg-neutral-800 rounded-3xl flex justify-start items-end p-8 border border-transparent hover:border-neutral-600 hover:scale-[1.01] transition-transform duration-300 ease-in-out">
            Loja
          </div>
        </Link>

        <div
          className="col-span-1 row-span-2 bg-neutral-800 rounded-3xl flex justify-start items-end p-8"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="flex gap-3 items-center">
            <p className="text-secondary-color">{userData?.coins}</p>
            <img className="max-w-8 max-h-8" src={coin} alt="Moeda dourada" />
          </div>
        </div>

        <Link
          to="/perfil"
          className="col-span-3 row-span-6"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <div className="h-full w-full bg-neutral-800 rounded-3xl flex justify-start items-end p-8 border border-transparent hover:border-neutral-600 hover:scale-[1.01] transition-transform duration-300 ease-in-out">
            Perfil
          </div>
        </Link>

        <div
          className="col-span-1 row-span-6 bg-neutral-800 rounded-3xl flex justify-start items-end p-8"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="flex gap-3 items-center">
            <img className="max-w-8 max-h-8" src={fire} alt="Chama" />
            <p className="text-secondary-color">20 dias</p>
          </div>
        </div>
      </div>
    </section>
  );
};
