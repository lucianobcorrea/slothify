import { Main, ButtonComponent, InputComponent } from "@/ui/index";

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

import defaultAvatar from "@/assets/image/profile/default.png";
import defaultBanner from "@/assets/image/profile/defaultBanner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { useEditProfile } from "@/hook/useEditProfile/useEditProfile.hook";
import { useAuthContext } from "@/hook/useAuthContext/useAuthContext.hook";
import { useUserDataContext } from "@/hook/useDataUserContext/useUserDataContext.hook";
import { useGetUserAreas } from "@/hook/useGetUserAreas/useGetUserAreas.hook";
import { useGetUserReasons } from "@/hook/useGetUserReasons/useGetUserReasons.hook";
import { useGetUserSchedule } from "@/hook/useGetUserSchedule/useGetUserSchedule.hook";
import { useGetUserItems } from "@/hook/useGetUserItems/useGetUserItems.hook";
import { useGetUserAchievements } from "@/hook/useGetUserAchievements/useGetUserAchievements.hook";
import { useGetUserTopRanking } from "@/hook/useGetUserTopRanking/useGetUserTopRanking.hook";

import firstPlace from "@/assets/image/ranking/1-place.png";
import secondPlace from "@/assets/image/ranking/2-place.png";
import thirdPlace from "@/assets/image/ranking/3-place.png";

import "aos/dist/aos.css";
import AOS from "aos";
import { useItem } from "@/hook/useItem/useItem.hook";

const schema = z.object({
  username: z.string().min(1, { message: "O nome de usuário é obrigatório!" }),
  avatar: z.instanceof(FileList).optional(),
  banner: z.instanceof(FileList).optional(),
  color: z.string(),
  userSelectedAvatar: z.string().nullable().optional(),
  userSelectedBanner: z.string().nullable().optional(),
});

export type FormFields = z.infer<typeof schema>;

export const Profile = () => {
  const { userData } = useUserDataContext();
  const { authUser } = useAuthContext();
  const [open, setOpen] = useState<boolean>(false);
  const [openItems, setOpenItems] = useState<boolean>(false);
  const [openAchievements, setOpenAchievements] = useState<boolean>(false);
  const [openUsedItem, setOpenUsedItem] = useState<boolean>(false);

  const [changeItems, setChangeItems] = useState<boolean>(false);

  const { areas, fetchUserAreas } = useGetUserAreas();
  const { reasons, fetchUserReasons } = useGetUserReasons();
  const { schedules, fetchUserSchedule } = useGetUserSchedule();
  const { items, fetchUserItems } = useGetUserItems();
  const { achievements, fetchUserAchievements } = useGetUserAchievements();
  const { ranking, fetchUserRanking } = useGetUserTopRanking();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: authUser?.username || "",
      color: authUser?.color || "#424242",
    },
  });

  const onSubmit = useEditProfile(setOpen);

  useEffect(() => {
    if (authUser) {
      reset({
        username: authUser.username || "",
        color: authUser.color || "#424242",
      });
    }
  }, [authUser, reset]);

  useEffect(() => {
    fetchUserAreas();
    fetchUserReasons();
    fetchUserSchedule();
    fetchUserAchievements();
    fetchUserRanking();
  }, []);

  useEffect(() => {
    fetchUserItems();
  }, [changeItems]);

  const [itemId, setItemId] = useState<number>(0);
  const [itemImage, setItemImage] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemSubtype, setSubtype] = useState<string>("");
  const [itemType, setType] = useState<string>("");

  const [achievementImage, setAchievementImage] = useState<string>("");
  const [achievementName, setAchievementName] = useState<string>("");
  const [achievementDescription, setAchievementDescription] =
    useState<string>("");
  const [achievementTotal, setAchievementTotal] = useState<number>(0);
  const [achievementRequired, setAchievementRequired] = useState<number>(0);
  const [achievementPercentage, setAchievementPercentage] = useState<number>(0);
  const [userHasAchievement, setUserHasAchievement] = useState<boolean>(false);

  const { fetchUseItem, itemData, canOpenItemUsedModal } = useItem();

  interface Achievement {
    id: number;
    name: string;
    description: string;
    image: string;
    userHas: boolean;
    total: number;
    required: number;
    percentage: number;
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

  function setAchievementData(achievement: Achievement) {
    setAchievementImage(achievement.image);
    setAchievementName(achievement.name);
    setAchievementDescription(achievement.description);
    setUserHasAchievement(achievement.userHas);
    setOpenAchievements(true);
    setAchievementTotal(achievement.total);
    setAchievementRequired(achievement.required);
    setAchievementPercentage(achievement.percentage);
  }

  function setItemData(item: Item) {
    setItemImage(item.image);
    setItemId(item.id);
    setItemName(item.name);
    setItemDescription(item.description);
    setSubtype(item.subtype);
    setType(item.itemType);
    setOpenItems(true);
  }

  const handleCloseModal = () => {
    setOpenItems(false);
    setChangeItems(false);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Main itemData={itemData}>
      <div className="relative" data-aos="zoom-out-up">
        <img
          className="w-full h-[600px] object-cover rounded-b-[50px]"
          src={authUser?.banner || defaultBanner}
          alt="Banner do usuário"
        />
      </div>
      <div
        className="container bg-neutral-850 bottom-[-6%] left-0 right-0 rounded-3xl py-10 relative z-10 mt-[-150px] mb-10"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-[1.3fr,2fr,0.5fr] px-24">
          <div className="relative" data-aos="zoom-in">
            <div
              className="rounded-3xl p-6 w-full flex justify-center relative top-[-50%]"
              style={{
                backgroundColor: authUser?.color ? authUser.color : "#424242",
              }}
            >
              <img
                className="w-[300px] h-[300px] object-cover"
                src={authUser?.avatar || defaultAvatar}
                alt="Avatar do usuário"
              />
            </div>

            <div className="flex items-center gap-2 relative top-[-45%]">
              <div className="w-full">
                <h2 className="text-[24px] text-white font-bold mb-2">
                  Nível do Jogador: {userData?.actualLevel}
                </h2>
                {!userData?.maxLevel ? (
                  <p className="text-[16px] text-white font-medium">
                    <span style={{ color: userData?.levelColor }}>
                      {userData?.actualXp}
                    </span>
                    /{userData?.xpToNextLevel} XP
                  </p>
                ) : (
                  <p className="text-[16px] font-bold text-white">
                    <FontAwesomeIcon
                      style={{ color: userData?.levelColor }}
                      icon={faTrophy}
                      className="mr-2 text-lg"
                    />
                    {userData?.actualXp} XP
                    <span
                      className="ml-2 text-lg"
                      role="img"
                      aria-label="trophy"
                    ></span>
                  </p>
                )}
                <Progress
                  value={userData?.percentageToNextLevel}
                  className="w-full bg-neutral-500 h-5"
                  indicatorStyle={{ backgroundColor: userData?.levelColor }}
                />
              </div>
            </div>
          </div>
          <div
            className="flex justify-start flex-col ps-10"
            data-aos="fade-right"
          >
            <h1 className="font-bold text-white text-4xl">
              {authUser?.username}
            </h1>
            {ranking && (
              <div className="flex gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <img
                    className="max-w-[46px] w-full"
                    src={firstPlace}
                    alt="Medalha de primeiro lugar"
                  />
                  <h2 className="text-secondary-color font-bold">
                    {ranking.timesInFirstPlace}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="max-w-[46px] w-full"
                    src={secondPlace}
                    alt="Medalha de segundo lugar"
                  />
                  <h2 className="text-secondary-color font-bold">
                    {ranking.timesInSecondPlace}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="max-w-[46px] w-full"
                    src={thirdPlace}
                    alt="Medalha de terceiro lugar"
                  />
                  <h2 className="text-secondary-color font-bold">
                    {ranking.timesInThirdPlace}
                  </h2>
                </div>
              </div>
            )}
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
                {authUser ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                      <DialogTitle>Editar perfil</DialogTitle>
                      <DialogDescription className="text-neutral-400">
                        Escolha o nome de usuário, avatar e banner do seu
                        perfil. Clique em salvar quando você terminar.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-[4fr,1fr] gap-14">
                      <div>
                        <InputComponent
                          register={{ ...register("username") }}
                          classname={`mt-6 ${
                            errors.username ? "mb-2" : "mb-6"
                          }`}
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
                            errors.color ? "mb-2" : "mb-6"
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

                    {items && items.AVATAR && (
                      <section className="mt-10 mb-10">
                        <h2 className="mb-4">Seus avatares</h2>
                        <div className="flex flex-wrap gap-5">
                          {items.AVATAR.map((avatar) => (
                            <div key={avatar.id}>
                              <label
                                htmlFor={avatar.id.toString()}
                                className="cursor-pointer"
                              >
                                <input
                                  {...register("userSelectedAvatar")}
                                  type="radio"
                                  id={avatar.id.toString()}
                                  value={avatar.id}
                                  className="hidden peer"
                                />
                                <img
                                  className="max-w-28 rounded-full transition-transform duration-200 
                         peer-checked:border-2 peer-checked:border-primary-color
                         transform peer-checked:scale-105"
                                  src={avatar.image}
                                  alt={`Avatar ${avatar.id}`}
                                />
                              </label>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {items && items.BANNER && (
                      <section className="mt-10 mb-10">
                        <h2 className="mb-4">Seus Banners</h2>
                        <div className="flex flex-wrap gap-5">
                          {items.BANNER.map((banner) => (
                            <div key={banner.id}>
                              <label
                                htmlFor={banner.id.toString()}
                                className="cursor-pointer"
                              >
                                <input
                                  {...register("userSelectedBanner")}
                                  type="radio"
                                  id={banner.id.toString()}
                                  value={banner.id}
                                  className="hidden peer"
                                />
                                <img
                                  className="max-w-36 transition-transform duration-200 
                         peer-checked:border-2 peer-checked:border-primary-color
                         transform peer-checked:scale-105"
                                  src={banner.image}
                                  alt={`Banner ${banner.id}`}
                                />
                              </label>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

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
                ) : (
                  <p>Carregando...</p>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Items modal */}
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

        {/* Achievements modal */}
        <Dialog open={openAchievements} onOpenChange={setOpenAchievements}>
          <DialogContent className="sm:max-w-[900px] bg-neutral-850 border-0 focus-visible:outline-none text-white flex flex-col items-center">
            <DialogHeader className="flex items-center">
              <DialogTitle className="text-4xl">{achievementName}</DialogTitle>
              {achievementImage && (
                <img
                  className={`${
                    !userHasAchievement ? "grayscale" : ""
                  } max-w-[300px]`}
                  src={achievementImage}
                  alt={achievementName}
                  data-aos="zoom-in"
                />
              )}
              <DialogDescription className="text-white text-lg text-center flex flex-col items-center">
                {achievementDescription}

                {userHasAchievement ? (
                  <Progress
                    value={achievementPercentage}
                    className="w-full bg-neutral-500 h-5 mt-10"
                    indicatorStyle={{ backgroundColor: "#A855F7" }}
                  />
                ) : (
                  <>
                    <div className="flex justify-between w-full mt-6">
                      <h2>{achievementTotal}</h2>
                      <h2 className="text-secondary-color font-bold">
                        {achievementRequired}
                      </h2>
                    </div>
                    <Progress
                      value={achievementPercentage}
                      className="w-full bg-neutral-500 h-5"
                      indicatorStyle={{ backgroundColor: "#A855F7" }}
                    />
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className="container mt-[-130px] mb-20 relative z-10">
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-neutral-900 p-6 rounded-xl">
              <div className="flex justify-between mb-4">
                <h2 className="text-white">Meus itens</h2>
                <button
                  className="text-secondary-color"
                  onClick={() => navigate("/perfil/items")}
                >
                  Ver mais
                </button>
              </div>
              <div className="grid grid-cols-4 gap-5">
                {items && Object.keys(items).length > 0 ? (
                  Object.entries(items)
                    .flatMap(([, itemArray]) => itemArray)
                    .slice(0, 8)
                    .map((item) => (
                      <button key={item.id} onClick={() => setItemData(item)}>
                        <div className="bg-neutral-800 p-4 rounded-xl h-full">
                          <img
                            className="max-w-[100px] h-full object-cover"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                      </button>
                    ))
                ) : (
                  <p className="text-white col-span-4">
                    Nenhum item encontrado.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-neutral-900 p-6 rounded-xl">
              <div className="flex justify-between mb-4">
                <h2 className="text-white">Minhas conquistas</h2>
                <button
                  className="text-secondary-color"
                  onClick={() =>
                    navigate("/perfil/conquistas", {
                      state: { achievements },
                    })
                  }
                >
                  Ver mais
                </button>
              </div>
              <div className="grid grid-cols-4 gap-5">
                {achievements && achievements.length > 0 ? (
                  achievements.slice(0, 8).map((achievement) => (
                    <button
                      key={achievement.id}
                      onClick={() => setAchievementData(achievement)}
                    >
                      <div className="bg-neutral-800 p-4 rounded-xl h-full">
                        <img
                          className={`${
                            !achievement.userHas ? "grayscale" : ""
                          } max-w-[100px] h-full object-cover`}
                          src={achievement.image}
                          alt={achievement.name}
                        />
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-white col-span-4">
                    Nenhum item encontrado.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <hr className="border-neutral-600" />
        <section className="container mt-10">
          <div className="grid grid-cols-3 gap-16">
            <div>
              <h2 className="text-secondary-color text-xl pb-3">
                O que estou aprendendo?
              </h2>
              <ul className="marker:text-primary-color pl-5">
                {areas.map((area, index) => {
                  return (
                    <li key={index} className="text-white list-disc list">
                      {area.title}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h2 className="text-secondary-color text-xl pb-3">
                Qual a minha motivação?
              </h2>
              <ul className="marker:text-primary-color pl-5">
                {reasons.map((reason, index) => {
                  return (
                    <li key={index} className="text-white list-disc list">
                      {reason.title}
                    </li>
                  );
                })}
              </ul>
            </div>

            {schedules && (
              <div>
                <h2 className="text-secondary-color text-xl pb-3">
                  Eu estudo...
                </h2>
                <ul className="marker:text-primary-color pl-5">
                  {schedules.studyDays.length == 7 ? (
                    <li className="text-white list-disc list">Todos os dias</li>
                  ) : (
                    schedules.studyDays.map((schedule, index) => {
                      return (
                        <li key={index} className="text-white list-disc list">
                          {schedule.weekDay}
                        </li>
                      );
                    })
                  )}
                  <li className="text-white list-disc list">
                    Por {schedules.studyDuration} Minutos
                  </li>
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    </Main>
  );
};
