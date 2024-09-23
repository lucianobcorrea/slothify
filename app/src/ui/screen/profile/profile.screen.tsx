import { Main } from "@/ui/layouts/main.layout";
import banner from "@/assets/image/profile/banner-profile.png";
import avatar from "@/assets/image/profile/avatar.png";
import { ButtonComponent } from "@/ui/component/button/button.component";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputComponent } from "@/ui/component/input/input.component";
import { useForm } from "react-hook-form";
import { useEditProfile } from "@/hook/useEditProfile/useEditProfile.hook";
import { useAuthContext } from "@/hook/useAuthContext/useAuthContext.hook";
import { useState } from "react";

const schema = z.object({
  username: z.string().min(1, { message: "O nome de usuário é obrigatório!" }),
  avatar: z.instanceof(FileList).optional(),
  banner: z.instanceof(FileList).optional(),
  color: z.string(),
});

export type FormFields = z.infer<typeof schema>;

export const Profile = () => {
  const { authUser } = useAuthContext();
  const [open, setOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: authUser?.username || "",
      color: authUser?.color || "#424242",
    },
  });

  const onSubmit = useEditProfile(setOpen);

  return (
    <Main>
      <div className="relative">
        <img
          className="w-full h-[600px] object-cover rounded-b-[50px]"
          src={authUser?.banner}
          alt="Banner do usuário"
        />
      </div>
      <div className="container bg-neutral-850 bottom-[-6%] left-0 right-0 rounded-3xl py-10 relative z-10 mt-[-150px]">
        <div className="grid grid-cols-[1.3fr,2fr,0.5fr] px-24">
          <div className="relative">
            <div
              className="rounded-3xl p-6 w-full h-full flex justify-center relative top-[-50%]"
              style={{
                backgroundColor: authUser?.color ? authUser.color : "#424242",
              }}
            >
              <img
                className="w-[300px] h-[300px] object-cover"
                src={authUser?.avatar}
                alt="Avatar do usuário"
              />
            </div>
          </div>
          <div className="flex justify-start ps-10">
            <h1 className="font-bold text-white text-4xl">
              {authUser?.username}
            </h1>
          </div>
          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <ButtonComponent
                  btnType="button"
                  classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color"
                >
                  Editar perfil
                </ButtonComponent>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px] bg-neutral-850 border-0 focus-visible:outline-none text-white">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Editar perfil</DialogTitle>
                    <DialogDescription className="text-neutral-400">
                      Escolha o nome de usuário, avatar e banner do seu perfil.
                      Clique em salvar quando você terminar.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-[4fr,1fr] gap-14">
                    <div>
                      <InputComponent
                        register={{ ...register("username") }}
                        classname={`mt-6 ${errors.username ? "mb-2" : "mb-6"}`}
                        placeholder="Ex.: Luciano Corrêa"
                        type="text"
                        id="username"
                      >
                        Nome de Usuário
                      </InputComponent>
                      {errors.username && (
                        <div className="text-red-500 text-sm mb-4">
                          {errors.username.message}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 mb-6 grid w-full gap-4">
                      <Label
                        className="text-white text-base font-light"
                        htmlFor="color"
                      >
                        Cor do avatar
                      </Label>
                      <Input
                        {...register("color")}
                        className={`p-[7px] h-full rounded-2xl text-base text-white border-neutral-500 focus:border-white ${
                          errors.username ? "mb-2" : "mb-6"
                        }`}
                        id="color"
                        type="color"
                      />
                      {errors.color && (
                        <div className="text-red-500 text-sm mb-4">
                          {errors.color.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 mb-10 gap-14">
                    <div className="grid w-full items-center gap-1.5">
                      <Label
                        className="text-white text-base font-light"
                        htmlFor="avatar"
                      >
                        Avatar
                      </Label>
                      <Input
                        {...register("avatar")}
                        className="bg-neutral-850 rounded-xl border-neutral-500 file:text-primary-color"
                        id="avatar"
                        type="file"
                      />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                      <Label
                        className="text-white text-base font-light"
                        htmlFor="banner"
                      >
                        Banner
                      </Label>
                      <Input
                        {...register("banner")}
                        className="bg-neutral-850 rounded-xl border-neutral-500 file:text-primary-color"
                        id="banner"
                        type="file"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <div className="flex gap-6">
                      <DialogClose>
                        <ButtonComponent
                          btnType="button"
                          classname="bg-neutral-200 hover:bg-gray-300 hover:border-white border-neutral-100 text-black"
                        >
                          Cancelar
                        </ButtonComponent>
                      </DialogClose>

                      <ButtonComponent
                        btnType="submit"
                        classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color"
                      >
                        Salvar
                      </ButtonComponent>
                    </div>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Main>
  );
};
