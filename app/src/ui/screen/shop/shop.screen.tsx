import { Main } from "@/ui/layouts/main.layout";
import shopSloth from "@/assets/image/home/shop-sloth.png";

export const Shop = () => {

  return (
    <Main>
      <section className="container h-[100vh]">
        <h1 className="text-white text-4xl font-bold mt-14">Loja</h1>

        <div className="grid grid-cols-[1fr_3fr] gap-4">
          <div>
            <img
              className="max-w-xl animate-sway fixed"
              src={shopSloth}
              alt="Preguiça vendedora"
            />
          </div>

          <div></div>
        </div>
      </section>
    </Main>
  );
};
