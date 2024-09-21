import coin from "@/assets/image/general/coin.png";
import fire from "@/assets/image/general/fire.png";
import profile from "@/assets/image/general/profile.png";
import shop from "@/assets/image/general/shop.png";
import missions from "@/assets/image/general/missions.png";
import config from "@/assets/image/general/config.png";

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="h-32 border-b-[1px] border-neutral-700 bg-neutral-850 flex items-center">
      <div className="container flex justify-between items-center p-0">
        <div className="flex items-center gap-9">
          <Link to="/menu">
            <div className="flex items-center gap-3 bg-neutral-700 w-fit px-6 py-2 rounded-lg hover:bg-neutral-600  transition ease-in-out">
              <img
                className="max-h-11 max-w-11"
                src={config}
                alt="Engrenagem roxa"
              />
              <p className="text-white font-bold text-xl">Menu</p>
            </div>
          </Link>

          <Link to="/perfil">
            <div className="flex items-center gap-3 bg-neutral-700 w-fit px-6 py-2 rounded-lg hover:bg-neutral-600  transition ease-in-out">
              <img
                className="max-h-11 max-w-11"
                src={profile}
                alt="Ilustração de uma cabeça de um menino"
              />
              <p className="text-white font-bold text-xl">Perfil</p>
            </div>
          </Link>

          <Link to="/loja">
            <div className="flex items-center gap-3 bg-neutral-700 w-fit px-6 py-2 rounded-lg hover:bg-neutral-600  transition ease-in-out">
              <img
                className="max-h-11 max-w-11"
                src={shop}
                alt="Carrinho de compras com uma preguiça dentro"
              />
              <p className="text-white font-bold text-xl">Loja</p>
            </div>
          </Link>

          <Link to="/missoes">
            <div className="flex items-center gap-3 bg-neutral-700 w-fit px-6 py-2 rounded-lg hover:bg-neutral-600  transition ease-in-out">
              <img
                className="max-h-11 max-w-11"
                src={missions}
                alt="Livro aberto"
              />
              <p className="text-white font-bold text-xl">Missões</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <img className="max-h-6 max-w-6" src={fire} alt="Chama" />
            <p className="text-secondary-color font-bold text-xl">20 dias</p>
          </div>

          <span className="text-neutral-700 font-medium text-xl">|</span>

          <div className="flex items-center gap-2">
            <p className="text-secondary-color font-bold text-xl">2134</p>
            <img className="max-h-6 max-w-6" src={coin} alt="Moeda dourada" />
          </div>
        </div>
      </div>
    </header>
  );
};
