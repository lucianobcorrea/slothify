import coin from "@/assets/image/general/coin.png";

interface Props {
  name: string;
  image: string;
  value: number;
  rarity: string;
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

  return (
    <div
      className={`relative rounded-xl p-1 bg-gradient-to-b ${getGradientColor(
        props.rarity
      )} to-transparent`}
    >
      <div className="bg-neutral-800 rounded-xl p-6 relative">
        <div className="flex gap-2 justify-end">
          <h3 className="text-end text-secondary-color font-bold">
            {props.value}
          </h3>
          <img className="max-w-5 max-h-5" src={coin} alt="Moeda" />
        </div>
        <img className="w-full" src={props.image} alt={props.name} />
        <h2 className="text-white font-bold text-xl text-center">
          {props.name}
        </h2>
      </div>
    </div>
  );
};
