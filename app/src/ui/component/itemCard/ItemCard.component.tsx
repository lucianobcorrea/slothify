import coin from "@/assets/image/general/coin.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Props {
  name: string;
  image: string;
  value: number;
  rarity: string;
  subtype: string;
  alreadyHas: boolean;
}

export const ItemCard = (props: Props) => {
  const getGradientColor = (rarity: string) => {
    switch (rarity) {
      case "COMMON":
        return "from-gray-400";
      case "UNCOMMON":
        return "from-blue-400";
      case "RARE":
        return "from-purple-400";
      default:
        return "from-green-400";
    }
  };

  return props.subtype !== "BANNER" ? (
    <div
      className={`relative rounded-xl p-1 bg-gradient-to-b ${getGradientColor(
        props.rarity
      )} to-transparent`}
    >
      <div className="bg-neutral-800 rounded-xl p-6 relative">
        <div className="flex justify-end">
          {!props.alreadyHas ? (
            <div className="flex gap-2 bg-neutral-750 rounded-md w-fit px-3 py-1">
              <h3 className="text-end text-secondary-color font-bold">
                {props.value}
              </h3>
              <img className="max-w-5 max-h-5" src={coin} alt="Moeda" />
            </div>
          ) : (
            <FontAwesomeIcon
              className="text-lime-400 text-3xl"
              icon={faCheck}
            />
          )}
        </div>
        <img className="max-full" src={props.image} alt={props.name} />
        <h2 className="text-white font-bold text-xl text-center">
          {props.name}
        </h2>
      </div>
    </div>
  ) : (
    <div
      className={`relative rounded-xl p-1 bg-gradient-to-b ${getGradientColor(
        props.rarity
      )} to-transparent`}
    >
      <div className="bg-neutral-800 rounded-xl relative">
        <div className="flex justify-end">
          <div className="flex gap-2 bg-neutral-750 rounded-md w-fit px-3 py-1 absolute right-[24px] top-[24px]">
            <h3 className="text-end text-secondary-color font-bold">
              {props.value}
            </h3>
            <img className="max-w-5 max-h-5 relative" src={coin} alt="Moeda" />
          </div>
        </div>
        <img
          className="min-h-64 object-cover"
          src={props.image}
          alt={props.name}
        />
      </div>
    </div>
  );
};
