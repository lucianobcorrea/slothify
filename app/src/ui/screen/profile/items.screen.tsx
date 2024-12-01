import { ButtonComponent } from "@/ui/component/button/button.component";
import { ItemCard } from "@/ui/component/itemCard/ItemCard.component";
import { Main } from "@/ui/layouts/main.layout";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useItem } from "@/hook/useItem/useItem.hook";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGetUserItems } from "@/hook/useGetUserItems/useGetUserItems.hook";

export const Items = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [itemId, setItemId] = useState<number>(0);
  const [itemImage, setItemImage] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemSubtype, setSubtype] = useState<string>("");
  const [itemType, setType] = useState<string>("");
  const [openItems, setOpenItems] = useState<boolean>(false);
  const [openUsedItem, setOpenUsedItem] = useState<boolean>(false);

  const { fetchUseItem, itemData, canOpenItemUsedModal } = useItem();
  const { items, fetchUserItems } = useGetUserItems();
  const [changeItems, setChangeItems] = useState<boolean>(false);

  useEffect(() => {
    fetchUserItems();
  }, [changeItems]);

  function setItemData(item: Item) {
    setItemImage(item.image);
    setItemId(item.id);
    setItemName(item.name);
    setItemDescription(item.description);
    setSubtype(item.subtype);
    setType(item.itemType);
    setOpenItems(true);
  }

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
  }

  const handleCloseModal = () => {
    setOpenItems(false);
    setChangeItems(false);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Main itemData={itemData}>
      {canOpenItemUsedModal ? (
        <Dialog open={openUsedItem} onOpenChange={setOpenUsedItem}>
          <DialogContent className="sm:max-w-[900px] bg-neutral-850 border-0 focus-visible:outline-none text-white flex flex-col items-center">
            <DialogHeader className="flex items-center">
              <DialogTitle className="text-5xl font-bold mb-3">
                Você usou o item
              </DialogTitle>
              <DialogTitle className="text-3xl">{itemName}</DialogTitle>
              {itemImage && (
                <img
                  className="max-w-[300px]"
                  src={itemImage}
                  alt={itemName}
                  data-aos="zoom-in"
                />
              )}
              <DialogDescription className="text-white text-lg text-center flex flex-col items-center">
                {itemDescription}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : null}

      <Dialog open={openItems} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[900px] bg-neutral-850 border-0 focus-visible:outline-none text-white flex flex-col items-center">
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-4xl">{itemName}</DialogTitle>
            {itemImage && (
              <img
                className={`${
                  itemSubtype == "BANNER"
                    ? "py-10 max-w-[500px]"
                    : "max-w-[300px]"
                }`}
                src={itemImage}
                alt={itemName}
                data-aos="zoom-in"
              />
            )}
            <DialogDescription className="text-white text-lg text-center flex flex-col items-center">
              {itemDescription}
            </DialogDescription>
          </DialogHeader>

          {itemType == "UTILITY" ? (
            <DialogFooter>
              <div className="flex mt-2">
                <ButtonComponent
                  clickEvent={() => {
                    fetchUseItem(itemId, setChangeItems);
                    setOpenItems(false);
                    setOpenUsedItem(true);
                  }}
                  btnType="button"
                  classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color"
                >
                  Usar item
                </ButtonComponent>
              </div>
            </DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>

      <div className="container">
        <ButtonComponent
          clickEvent={() => navigate(-1)}
          btnType="button"
          classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color mt-14"
          data-aos="fade-right"
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faAngleLeft} />
            Voltar
          </div>
        </ButtonComponent>
        <div className="mt-10 mb-10">
          {items && items.UTILITY && items.UTILITY.length > 0 ? (
            <h2
              className="text-white font-bold mb-5 text-2xl"
              data-aos="fade-right"
            >
              Itens Utilitários
            </h2>
          ) : null}
          <div className="grid grid-cols-4 gap-5">
            {items && Object.keys(items).length > 0 ? (
              Object.entries(items).map(([, itemArray]) =>
                itemArray
                  .filter((item) => item.itemType === "UTILITY")
                  .map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setItemData(item)}
                      data-aos="zoom-in"
                      data-aos-delay={index * 100}
                    >
                      <ItemCard
                        name={item.name}
                        image={item.image}
                        value={item.value}
                        rarity={item.rarity}
                        subtype={item.subtype}
                        alreadyHas={null}
                        showValue={false}
                      />
                    </button>
                  ))
              )
            ) : (
              <p className="text-white col-span-4">
                Nenhum item utilitário encontrado.
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 mb-20">
          <h2
            className="text-white font-bold mb-5 text-2xl"
            data-aos="fade-right"
          >
            Outros Itens
          </h2>
          <div className="grid grid-cols-4 gap-5">
            {items && Object.keys(items).length > 0 ? (
              Object.entries(items).map(([, itemArray]) =>
                itemArray
                  .filter((item) => item.itemType !== "UTILITY")
                  .map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setItemData(item)}
                      data-aos="zoom-in"
                      data-aos-delay={index * 100}
                    >
                      <ItemCard
                        name={item.name}
                        image={item.image}
                        value={item.value}
                        rarity={item.rarity}
                        subtype={item.subtype}
                        alreadyHas={null}
                        showValue={false}
                      />
                    </button>
                  ))
              )
            ) : (
              <p className="text-white col-span-4">
                Nenhum outro item encontrado.
              </p>
            )}
          </div>
        </div>
      </div>
    </Main>
  );
};
