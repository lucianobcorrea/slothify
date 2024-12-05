import { Main } from "@/ui/layouts/main.layout";
import shopSloth from "@/assets/image/home/shop-sloth.png";
import { useGetShopItems } from "@/hook/useGetShopItems/useGetShopItems.hook";
import { useEffect, useState } from "react";
import SwiperWithNavigation from "@/ui/component/swiperWithNavigation/swiperWithNavigation.component";
import coin from "@/assets/image/general/coin.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ButtonComponent } from "@/ui/component/button/button.component";
import { useBuyItem } from "@/hook/useBuyItem/useBuyItem.hook";

import AOS from "aos";
import "aos/dist/aos.css";

export const Shop = () => {
  const { items, fetchShopItems } = useGetShopItems();
  const [open, setOpen] = useState<boolean>(false);

  const [itemId, setItemId] = useState<number>(0);
  const [itemImage, setItemImage] = useState<string>("");
  const [itemValue, setItemValue] = useState<number>();
  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemAlreadyHas, setAlreadyHas] = useState<boolean>();
  const [itemSubtype, setSubtype] = useState<string>("");

  const { fetchBuyItem } = useBuyItem(
    itemImage,
    itemName,
    itemDescription,
    itemSubtype
  );

  interface Item {
    id: number;
    name: string;
    description: string;
    image: string;
    value: number;
    duration: number | null;
    rarity: string;
    itemType: string;
    subtype: string;
    userHasItem: boolean;
  }

  useEffect(() => {
    fetchShopItems();
    AOS.init({ duration: 1000 });
  }, []);

  function setItemData(item: Item) {
    setItemImage(item.image);
    setItemId(item.id);
    setItemValue(item.value);
    setItemName(item.name);
    setItemDescription(item.description);
    setAlreadyHas(item.userHasItem);
    setSubtype(item.subtype);
    setOpen(true);
  }

  const formatTitle = (key: string) => {
    switch (key) {
      case "AVATAR":
        return "Avatares";
      case "UTILITY":
        return "Utilitários";
      case "BANNER":
        return "Banners";
      default:
        return key.charAt(0) + key.slice(1).toLowerCase();
    }
  };

  const phrases = [
    "Bem-vindo à loja, aproveite!",
    "Veja só o que tenho no meu inventário, só coisa boa!",
    "Com esses itens, seus desafios vão ficar mais fáceis (ou estilosos)!",
    "Dê uma olhada! Pode ser que você encontre algo lendário.",
    "Seus esforços merecem recompensas, escolha com sabedoria!",
    "Volte sempre! Novidades estão a caminho."
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayedText("");

    let currentCharIndex = 1;
    const currentPhrase = phrases[currentPhraseIndex];

    const typingInterval = setInterval(() => {
      if (currentCharIndex <= currentPhrase.length) {
        setDisplayedText(currentPhrase.substring(0, currentCharIndex));
        currentCharIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentPhraseIndex]);

  return (
    <Main>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[900px] bg-neutral-850 border-0 focus-visible:outline-none text-white flex flex-col items-center">
          <DialogHeader className="flex items-center">
            {!itemAlreadyHas ? (
              <div className="flex gap-2 bg-neutral-750 rounded-md w-fit px-3 py-1 absolute items-center left-5 top-5">
                <h3 className="text-end text-2xl text-secondary-color font-bold">
                  {itemValue}
                </h3>
                <img className="max-w-6 max-h-6" src={coin} alt="Moeda" />
              </div>
            ) : (
              <div className="flex gap-2 bg-neutral-750 rounded-md w-fit px-2 py-[6px] absolute items-center left-5 top-5">
                <FontAwesomeIcon
                  className="text-lime-400 text-3xl"
                  icon={faCheck}
                />
              </div>
            )}
            <DialogTitle className="text-4xl">{itemName}</DialogTitle>
            {itemImage && (
              <img
                data-aos="zoom-in"
                className={`${
                  itemSubtype === "BANNER"
                    ? "py-10 max-w-[500px]"
                    : "max-w-[300px]"
                }`}
                src={itemImage}
                alt={itemName}
              />
            )}
            <DialogDescription className="text-white text-lg text-center flex flex-col items-center">
              {itemDescription}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div className="flex gap-6 mt-2">
              <ButtonComponent
                disabled={itemAlreadyHas}
                clickEvent={() => fetchBuyItem(itemId)}
                btnType="button"
                classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color"
              >
                {itemAlreadyHas ? "Já possui" : "Comprar"}
              </ButtonComponent>
              <ButtonComponent
                clickEvent={() => setOpen(false)}
                btnType="button"
                classname="bg-neutral-200 hover:bg-gray-300 hover:border-white border-neutral-100 text-black"
              >
                Cancelar
              </ButtonComponent>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section className="container h-[100vh]">
        <h1
          data-aos="fade-down"
          className="text-white text-4xl font-bold mt-14"
        >
          Loja
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-96">
          <div className="relative z-50">
            <div className="fixed bottom-[-60px] 2xl:left-0 left-[-80px]">
              <div className="relative">
                <img
                  className="2xl:max-w-xl max-w-[26rem] animate-sway"
                  src={shopSloth}
                  alt="Preguiça vendedora"
                />
                <div
                  className="border-[1px] border-neutral-500 animate-swaySlow absolute 2xl:bottom-96 bottom-[16rem] 2xl:left-[410px] left-[300px] transform -translate-x-1/2 mb-4 bg-neutral-700 text-white p-4 rounded-lg shadow-lg"
                  style={{ width: "220px" }}
                >
                  {displayedText}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 relative" data-aos="fade-right">
            {items && Object.keys(items).length > 0 ? (
              Object.entries(items).map(([key, itemList]) => (
                <SwiperWithNavigation
                  key={key}
                  items={itemList}
                  setItemData={setItemData}
                  title={formatTitle(key)}
                />
              ))
            ) : (
              <p className="text-white">Nenhum item encontrado.</p>
            )}
          </div>
        </div>
      </section>
    </Main>
  );
};
