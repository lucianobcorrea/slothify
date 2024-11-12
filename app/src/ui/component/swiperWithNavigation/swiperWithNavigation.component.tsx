import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { ItemCard } from "@/ui/component/itemCard/ItemCard.component";

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

  interface SwiperWithNavigationProps {
    items: Item[];
    setItemData: (item: Item) => void;
    title: string;
  }

  const SwiperWithNavigation: React.FC<SwiperWithNavigationProps> = ({ items, setItemData, title }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className="swiper-container relative mb-12">
      <h2 className="text-white font-bold mb-5 text-2xl">{title}</h2>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.navigation.init();
          swiper.navigation.update();
          setIsLocked(swiper.isLocked);
        }}
        onSlideChange={(swiper) => {
          setIsLocked(swiper.isLocked);
        }}
        onResize={(swiper) => {
          setIsLocked(swiper.isLocked);
        }}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        watchOverflow={true}
      >
        {items.map((item : Item) => (
          <SwiperSlide key={item.id || item.name}>
            <button onClick={() => setItemData(item)}>
              <ItemCard
                name={item.name}
                image={item.image}
                value={item.value}
                rarity={item.rarity}
                subtype={item.subtype}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {!isLocked && (
        <>
          <button
            ref={prevRef}
            className="custom-swiper-button-prev absolute left-[-50px] top-[50%] transform -translate-y-1/2 bg-neutral-800 text-white rounded-md w-10 h-10 flex items-center justify-center border-[1px] border-primary-color"
            aria-label="Anterior"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            ref={nextRef}
            className="custom-swiper-button-next absolute right-[-50px] top-[50%] transform -translate-y-1/2 bg-neutral-800 text-white rounded-md w-10 h-10 flex items-center justify-center border-[1px] border-primary-color"
            aria-label="Próximo"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </>
      )}
    </div>
  );
};

export default SwiperWithNavigation;
