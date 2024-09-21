import { Main } from "@/ui/layouts/main.layout";
import banner from "@/assets/image/profile/banner-profile.png";
import avatar from "@/assets/image/profile/avatar.png";
import { ButtonComponent } from "@/ui/component/button/button.component";
import coin from "@/assets/image/general/coin.png";
import fire from "@/assets/image/general/fire.png";

export const Profile = () => {
  return (
    <Main>
      <div className="relative">
        <img
          className="w-full h-[600px] object-cover rounded-b-[50px]"
          src={banner}
          alt="Banner do usuário"
        />
      </div>
      <div className="container bg-neutral-850 absolute bottom-[-6%] left-0 right-0 rounded-3xl py-10">
        <div className="grid grid-cols-[1.3fr,2fr,0.5fr] px-24">
          <div className="relative">
            <div className="bg-red-500 rounded-3xl p-6 w-full h-full flex justify-center relative top-[-50%]">
              <img
                className="w-[300px] h-[300px] object-cover"
                src={avatar}
                alt="Avatar do usuário"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <h1 className="font-bold text-white text-4xl">
              Luciano Balestrin Corrêa
            </h1>
          </div>
          <div className="flex justify-end">
            <ButtonComponent classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color">
              Editar perfil
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Main>
  );
};
