import { Link } from "react-router-dom";
import coin from "@/assets/image/general/coin.png";
import fire from "@/assets/image/general/fire.png";

export const Menu = () => {
  return (
    <section className="h-screen w-full flex justify-center items-center p-6">
      <div className="grid grid-cols-6 grid-rows-6 gap-6 h-full w-full text-3xl text-white font-bold">
        
        <Link to="/jogar" className="col-span-3 row-span-3">
          <div className="h-full w-full bg-neutral-800 rounded-3xl flex justify-start items-end p-8 border border-transparent hover:border-neutral-600 hover:scale-[1.01] transition-transform duration-300 ease-in-out">
            Jogar
          </div>
        </Link>
        
        <Link to="/" className="col-span-3 row-span-3">
          <div className="h-full w-full bg-neutral-800 rounded-3xl flex justify-start items-end p-8 border border-transparent hover:border-neutral-600 hover:scale-[1.01] transition-transform duration-300 ease-in-out">
            Institucional
          </div>
        </Link>
        
        <Link to="/ranking" className="col-span-3 row-span-2">
          <div className="h-full w-full bg-neutral-800 rounded-3xl flex justify-start items-end p-8 border border-transparent hover:border-neutral-600 hover:scale-[1.01] transition-transform duration-300 ease-in-out">
            Ranking
          </div>
        </Link>
        
        <Link to="/loja" className="col-span-2 row-span-8">
          <div className="h-full w-full bg-neutral-800 rounded-3xl flex justify-start items-end p-8 border border-transparent hover:border-neutral-600 hover:scale-[1.01] transition-transform duration-300 ease-in-out">
            Loja
          </div>
        </Link>
        
        <div className="col-span-1 row-span-2 bg-neutral-800 rounded-3xl flex justify-start items-end p-8">
          <div className="flex gap-3 items-center">
            <p className="text-secondary-color">2134</p>
            <img className="max-w-8 max-h-8" src={coin} alt="Moeda dourada" />
          </div>
        </div>
        
        <Link to="/perfil" className="col-span-3 row-span-6">
          <div className="h-full w-full bg-neutral-800 rounded-3xl flex justify-start items-end p-8 border border-transparent hover:border-neutral-600 hover:scale-[1.01] transition-transform duration-300 ease-in-out">
            Perfil
          </div>
        </Link>
        
        <div className="col-span-1 row-span-6 bg-neutral-800 rounded-3xl flex justify-start items-end p-8">
          <div className="flex gap-3 items-center">
            <img className="max-w-8 max-h-8" src={fire} alt="Chama" />
            <p className="text-secondary-color">20 dias</p>
          </div>
        </div>
      </div>
    </section>
  );
};
