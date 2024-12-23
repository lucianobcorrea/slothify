import coin from "@/assets/image/general/coin.png";
import fire from "@/assets/image/general/fire.png";
import fireOut from "@/assets/image/general/fire-out.png";
import profile from "@/assets/image/general/profile.png";
import shop from "@/assets/image/general/shop.png";
import missions from "@/assets/image/general/missions.png";
import config from "@/assets/image/general/config.png";
import ranking from "@/assets/image/ranking/1-place.png";

import { Link } from "react-router-dom";
import { useUserDataContext } from "@/hook/useDataUserContext/useUserDataContext.hook";

export const Header = () => {
  const { userData } = useUserDataContext();
  console.log(userData);
  return (
    <header className="h-32 border-b-[1px] border-neutral-700 bg-neutral-850 flex items-center">
      <div className="container flex justify-between items-center">
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

          <Link to="/ranking">
            <div className="flex items-center gap-3 bg-neutral-700 w-fit px-6 py-2 rounded-lg hover:bg-neutral-600  transition ease-in-out">
              <img
                className="max-h-11 max-w-11"
                src={ranking}
                alt="Livro aberto"
              />
              <p className="text-white font-bold text-xl">Ranking</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            {userData?.completedOffensiveToday && userData?.offensive != 0 ? (
              <img className="max-h-6 max-w-6" src={fire} alt="Chama" />
            ) : (
              <img
                className="max-h-6 max-w-6"
                src={fireOut}
                alt="Chama apagada"
              />
            )}
            <p className="text-secondary-color font-bold text-xl">
              {userData?.offensive}
            </p>
          </div>

          <span className="text-neutral-700 font-medium text-xl">|</span>

          <div className="flex items-center gap-2">
            <p className="text-secondary-color font-bold text-xl">
              {userData?.coins}
            </p>
            <img className="max-h-6 max-w-6" src={coin} alt="Moeda dourada" />
          </div>
        </div>
      </div>
    </header>
  );
};
