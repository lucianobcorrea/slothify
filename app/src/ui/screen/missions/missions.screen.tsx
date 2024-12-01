import { useGetChapters } from "@/hook/useGetChapters/useGetChapters.hook";
import { Main } from "@/ui/layouts/main.layout";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import defaultAvatar from "@/assets/image/profile/default.png";
import { ButtonComponent } from "@/ui/component/button/button.component";
import { useGetExplanation } from "@/hook/useGetExplanation/useGetExplanation.hook";
import { useGetUserAreas } from "@/hook/useGetUserAreas/useGetUserAreas.hook";
import { useAuthContext } from "@/hook/useAuthContext/useAuthContext.hook";
import { useUserDataContext } from "@/hook/useDataUserContext/useUserDataContext.hook";
import { Progress } from "@/components/ui/progress";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

import closedChest from "@/assets/image/general/closed-chest.png";
import openedChest from "@/assets/image/general/opened-chest.png";

import AOS from "aos";
import "aos/dist/aos.css";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserGetChallenges } from "@/hook/useUserGetChallenges/useUserGetChallenges.hook";
import { useCollectChallenge } from "@/hook/useCollectChallenge/useCollectChallenge.hook";
import { LoadingSpinner } from "@/ui/component/spinner/spinner.component";

const tailwindMarginClasses = [
  // Margens à esquerda
  "ml-10",
  "ml-14",
  "ml-16",
  "ml-20",
  "ml-24",
  "ml-28",
  "ml-32",
  "ml-36",
  // Margens à direita
  "mr-10",
  "mr-14",
  "mr-16",
  "mr-20",
  "mr-24",
  "mr-28",
  "mr-32",
  "mr-36",
];

export const Missions = () => {
  const setUserArea = (areaId: number) => {
    setAreaId(areaId);
    localStorage.setItem("areaId", areaId.toString());
  };

  const { authUser } = useAuthContext();
  const { userData } = useUserDataContext();

  const localStorageAreaId = localStorage.getItem("areaId");

  const mapExerciseCategoryName = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      SIMPLE_LEVEL: "Nível Simples",
      ADVERGAME: "Advergame",
      INTERACTIVE_LEVEL: "Nível Interativo",
      BOSS: "Chefe",
    };

    return categoryMap[category] || "Categoria Desconhecida";
  };

  const { areas, fetchUserAreas } = useGetUserAreas();
  const [areaId, setAreaId] = useState<number>(
    Number(localStorageAreaId) === 0 ? -1 : Number(localStorageAreaId)
  );

  const { chapters, fetchChapters, loadingChapters } = useGetChapters(areaId);
  const { fetchExplanation } = useGetExplanation();
  const { challenges, fetchUserChallenges } = useUserGetChallenges();
  const [changeChallenges, setChangeChallenges] = useState<boolean>(false);

  useEffect(() => {
    fetchChapters();
  }, [areaId]);

  useEffect(() => {
    fetchUserAreas();
  }, []);

  useEffect(() => {
    fetchUserChallenges();
  }, [changeChallenges]);

  const handleCloseModal = () => {
    resetRewards();
    setChallengeId(0);
    setChallengeName("");
    setOpenChallenges(false);
    setChangeChallenges(false);
  };

  interface Challenge {
    id: number;
    name: string;
  }

  const [openChallenges, setOpenChallenges] = useState<boolean>(false);
  const [challengeId, setChallengeId] = useState<number>(0);
  const [challengeName, setChallengeName] = useState<string>("");

  function setChallengeData(challenge: Challenge) {
    setChallengeId(challenge.id);
    setChallengeName(challenge.name);
    setOpenChallenges(true);
  }

  const { rewards, fetchCollectItem, resetRewards } = useCollectChallenge();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Main>
      {loadingChapters ? (
        <LoadingSpinner className="text-primary-color" size={46} />
      ) : (
        <>
          <Dialog open={openChallenges} onOpenChange={handleCloseModal}>
            <DialogContent
              className="sm:max-w-[900px] bg-neutral-850 border-0 focus-visible:outline-none text-white flex flex-col items-center"
            >
              <DialogHeader>
                <DialogTitle className="text-4xl">{challengeName}</DialogTitle>
              </DialogHeader>

              <div className="relative flex flex-col items-center">
                {!rewards && (
                  <img
                    data-aos="zoom-in"
                    className={`max-w-[500px] transition-transform duration-500 hover:scale-110 cursor-pointer`}
                    src={closedChest}
                    alt={challengeName}
                    onClick={() =>
                      fetchCollectItem(challengeId, setChangeChallenges)
                    }
                    onMouseDown={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.classList.add("animate-shake");
                      const holdTimeout = setTimeout(() => {
                        fetchCollectItem(challengeId, setChangeChallenges);
                      }, 1000);
                      target.dataset.holdTimeout = String(holdTimeout);
                    }}
                    onMouseUp={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.dataset.holdTimeout) {
                        clearTimeout(Number(target.dataset.holdTimeout));
                        delete target.dataset.holdTimeout;
                      }
                      target.classList.remove("animate-shake");
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.dataset.holdTimeout) {
                        clearTimeout(Number(target.dataset.holdTimeout));
                        delete target.dataset.holdTimeout;
                      }
                      target.classList.remove("animate-shake");
                    }}
                  />
                )}

                {rewards && (
                  <div
                    data-aos="zoom-in"
                    className="flex flex-col items-center"
                  >
                    <img
                      className="max-w-[500px] transition-transform duration-500 scale-105"
                      src={openedChest}
                      alt={`${challengeName} - Baú aberto`}
                    />
                    <div className="mt-4 flex flex-col items-center animate-fade-in">
                      <h2 className="text-2xl font-bold">Recompensas!</h2>
                      <p className="text-lg">XP: {rewards.xpReward}</p>
                      <p className="text-lg">Moedas: {rewards.coinsReward}</p>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <div className="container grid grid-cols-12 gap-4 p-0">
            <div className="col-span-9">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.title}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="grid grid-cols-9"
                >
                  <div className="col-span-4 relative">
                    <div className="absolute inset-0 flex justify-center">
                      <div className="w-1 bg-neutral-700 h-full min-h-screen"></div>
                    </div>
                    <div className="relative z-10 mt-10">
                      <div className="flex justify-center">
                        <div
                          style={{
                            backgroundColor: chapter?.color
                              ? chapter.color
                              : "#424242",
                          }}
                          className="text-white p-6 rounded-3xl flex items-center justify-center border"
                        >
                          <h2 className="font-bold italic text-lg">
                            {chapter.title}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-5 justify-center flex">
                    <div>
                      <ul className="mt-4 flex flex-col">
                        {chapter.lessons.map((lesson, lessonIndex) => {
                          const isMarginLeft = Math.random() < 0.5;
                          const marginSizes = [
                            "10",
                            "14",
                            "16",
                            "20",
                            "24",
                            "28",
                            "32",
                            "36",
                          ];
                          const randomIndex = Math.floor(
                            Math.random() * marginSizes.length
                          );
                          const marginSize = marginSizes[randomIndex];
                          const marginClass = `${
                            isMarginLeft ? "ml" : "mr"
                          }-${marginSize}`;

                          return (
                            <div
                              key={lesson.id}
                              data-aos="zoom-in"
                              data-aos-delay={lessonIndex * 50}
                            >
                              {lesson.canBeDone === true ? (
                                <div className={`${marginClass}`}>
                                  <Popover>
                                    <PopoverTrigger>
                                      <li className={`relative`}>
                                        <img
                                          src={lesson.exerciseCategory.image}
                                          alt={lesson.exerciseCategory.name}
                                          className="w-full max-w-32"
                                        />
                                      </li>
                                    </PopoverTrigger>
                                    <PopoverContent className="text-center bg-neutral-700 border-neutral-500">
                                      <h3 className="text-white font-thin text-sm mb-1">
                                        {mapExerciseCategoryName(
                                          lesson.exerciseCategory.name
                                        )}
                                      </h3>
                                      <h2 className="text-white text-xl font-bold">
                                        {lesson.title}
                                      </h2>
                                      <ButtonComponent
                                        clickEvent={() =>
                                          fetchExplanation(
                                            lesson.id,
                                            lesson.exerciseType
                                          )
                                        }
                                        btnType="button"
                                        classname="mt-4 bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color"
                                      >
                                        Iniciar
                                      </ButtonComponent>
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              ) : (
                                <li className={`relative ${marginClass}`}>
                                  <img
                                    src={lesson.exerciseCategory.image}
                                    alt={lesson.exerciseCategory.name}
                                    className="w-full max-w-32 grayscale"
                                  />
                                </li>
                              )}
                            </div>
                          );
                        })}
                      </ul>
                      <div className="hidden">
                        {tailwindMarginClasses.map((cls) => (
                          <span key={cls} className={cls}></span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-span-3 mt-10">
              <div className="sticky top-10">
                {areas.length > 1 ? (
                  <div
                    data-aos="fade-left"
                    className="flex justify-end w-full text-center mb-7"
                  >
                    <div className="bg-neutral-700 p-6 rounded-xl border-[1px] border-neutral-500 w-full">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <ButtonComponent
                            btnType="button"
                            classname="bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color"
                          >
                            Selecionar área
                          </ButtonComponent>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full p-0 bg-neutral-700 border-neutral-500 mt-3">
                          {areas.map((area, index) => {
                            return (
                              <>
                                <ButtonComponent
                                  key={index}
                                  clickEvent={() =>
                                    setUserArea(area.id ? area.id : -1)
                                  }
                                  btnType="button"
                                  classname="bg-transparent text-white border-none hover:bg-neutral-800 w-full shadow-none hover:rounded-sm !rounded-none"
                                >
                                  <DropdownMenuItem className="cursor-pointer focus:bg-transparent focus:text-white">
                                    {area.title}
                                  </DropdownMenuItem>
                                </ButtonComponent>
                                {index < areas.length - 1 ? (
                                  <hr className="border-neutral-500" />
                                ) : null}
                              </>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ) : null}

                <div
                  data-aos="fade-left"
                  data-aos-delay="200"
                  className="flex justify-end mb-7 w-full"
                >
                  <div className="bg-neutral-700 p-6 rounded-xl border-[1px] border-neutral-500 w-full">
                    <h2 className="text-[24px] text-white font-bold">
                      Nível do Jogador: {userData?.actualLevel}
                    </h2>

                    <div className="flex items-center gap-2">
                      <img
                        className="max-w-24"
                        src={authUser?.avatar || defaultAvatar}
                        alt="Avatar"
                      />
                      <div className="w-full">
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
                          indicatorStyle={{
                            backgroundColor: userData?.levelColor,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {challenges && (
                  <div
                    data-aos="fade-left"
                    data-aos-delay="400"
                    className="flex justify-end mb-7 w-full mt-7"
                  >
                    <div className="bg-neutral-700 p-6 rounded-xl border-[1px] border-neutral-500 w-full">
                      <h2 className="text-[24px] text-white font-bold">
                        Desafios diários
                      </h2>

                      {challenges.map((challenge, index) => {
                        return (
                          <section
                            key={index}
                            className="mt-4"
                            data-aos-delay={index * 100}
                          >
                            {challenge.collected || !challenge.completed ? (
                              <>
                                <h2 className="text-white">{challenge.name}</h2>
                                {challenge.collected ? (
                                  <h3 className="font-light text-neutral-400 text-sm">
                                    Já coletado
                                  </h3>
                                ) : null}
                                <Progress
                                  value={challenge.percentage}
                                  className="w-full bg-neutral-500 h-5 mt-2"
                                  indicatorStyle={{
                                    backgroundColor: "#A855F7",
                                  }}
                                />
                                {!challenge.completed && (
                                  <div className="flex justify-between w-full mt-2">
                                    <h2 className="text-white">
                                      {challenge.total}
                                    </h2>
                                    <h2 className="text-secondary-color font-bold">
                                      {challenge.required}
                                    </h2>
                                  </div>
                                )}
                              </>
                            ) : (
                              <button
                                className="text-start w-full"
                                onClick={() => setChallengeData(challenge)}
                              >
                                <h2 className="text-white">{challenge.name}</h2>
                                <Progress
                                  value={challenge.percentage}
                                  className="w-full bg-neutral-500 h-5 mt-2"
                                  indicatorStyle={{
                                    backgroundColor: "#A855F7",
                                  }}
                                />
                                {!challenge.completed && (
                                  <div className="flex justify-between w-full mt-2">
                                    <h2 className="text-white">
                                      {challenge.total}
                                    </h2>
                                    <h2 className="text-secondary-color font-bold">
                                      {challenge.required}
                                    </h2>
                                  </div>
                                )}
                              </button>
                            )}
                          </section>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Main>
  );
};
