import { Main } from "@/ui/layouts/main.layout";
import firstPlace from "@/assets/image/ranking/1-place.png";
import secondPlace from "@/assets/image/ranking/2-place.png";
import thirdPlace from "@/assets/image/ranking/3-place.png";
import avatar from "@/assets/image/profile/avatar.png";

export const Ranking = () => {
  return (
    <Main>
      <section className="container px-64">
        <h1 className="text-white text-4xl font-bold mt-14">
          Ranking de Jogadores
        </h1>

        <div className="bg-neutral-800 border-[1px] border-neutral-700 mt-12 p-8 rounded-xl">
          <div className="flex items-center justify-between">
            <img className="max-w-[75px] w-full" src={firstPlace} alt="Medalha dourada de primeiro lugar" />
            <div className="bg-red-500 rounded-full flex items-center justify-center">
              <img className="w-full max-w-32" src={avatar} alt="Imagem de perfil do usuário" />
            </div>
            <h2 className="text-white text-3xl font-medium">
              Luciano Balestrin Corrêa
            </h2>
            <h3 className="text-secondary-color text-lg font-bold">321 pts</h3>
          </div>
          <hr className="border-1 border-neutral-500 my-6" />
        </div>
      </section>
    </Main>
  );
};
