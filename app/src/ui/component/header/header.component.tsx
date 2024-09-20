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
      <div className="container">
        <div>
          <Link to="/menu">
            <div className="flex items-center gap-3 bg-neutral-700 w-fit px-6 py-3 rounded-lg">
              <img
                className="max-h-11 max-w-11"
                src={config}
                alt="Engrenagem roxa"
              />
              <p className="text-white font-bold text-xl">Menu</p>
            </div>
          </Link>
        </div>

        <div></div>
      </div>
    </header>
  );
};
