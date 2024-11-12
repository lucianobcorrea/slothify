import { Main } from "@/ui/layouts/main.layout";
import shopSloth from "@/assets/image/home/shop-sloth.png";
import { useGetShopItems } from "@/hook/useGetShopItems/useGetShopItems.hook";
import { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Navigation, Scrollbar } from "swiper/modules";

import { ItemCard } from "@/ui/component/itemCard/ItemCard.component";

export const Shop = () => {
  const { items, fetchShopItems } = useGetShopItems();

  useEffect(() => {
    fetchShopItems();
  }, [fetchShopItems]);

  return (
    <Main>
      <section className="container h-[100vh]">
        <h1 className="text-white text-4xl font-bold mt-14">Loja</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-96">
          <div className="relative">
            <img
              className="max-w-xl animate-sway fixed bottom-[-60px] left-20"
              src={shopSloth}
              alt="Preguiça vendedora"
            />
          </div>

          <div className="lg:col-span-3">
            {items && items["AVATAR"] && items["AVATAR"].length > 0 ? (
              <>
                <h2 className="text-white font-bold mb-5 text-2xl">Avatares</h2>
                <Swiper
                  modules={[Navigation, Scrollbar]}
                  spaceBetween={20}
                  slidesPerView={3}
                  navigation
                  scrollbar={{ draggable: true }}
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
                >
                  {items["AVATAR"].map((avatar) => (
                    <SwiperSlide key={avatar.id || avatar.name}>
                      <ItemCard
                        name={avatar.name}
                        image={avatar.image}
                        value={avatar.value}
                        rarity={avatar.rarity}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : (
              <p className="text-white">Nenhum item encontrado.</p>
            )}
          </div>
        </div>
      </section>
    </Main>
  );
};
