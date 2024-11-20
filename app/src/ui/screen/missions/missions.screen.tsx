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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const { chapters, fetchChapters } = useGetChapters(areaId);
  const { fetchExplanation } = useGetExplanation();

  useEffect(() => {
    fetchChapters();
  }, [areaId]);

  useEffect(() => {
    fetchUserAreas();
  }, []);

  return (
    <Main>
      <div className="container grid grid-cols-12 gap-4">
        <div className="col-span-9">
          {chapters.map((chapter) => (
            <>
              <div key={chapter.title} className="grid grid-cols-9 mb-8">
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
                      {chapter.lessons.map((lesson) => {
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
                          <div key={lesson.id}>
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
                                  <h3 className="text-white font-thin text-sm mb-1">{mapExerciseCategoryName(lesson.exerciseCategory.name)}</h3>
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
            </>
          ))}
        </div>

        <div className="col-span-3 mt-10">
          <div className="sticky top-10">
            <div className="flex justify-end mb-7 w-full">
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
                      indicatorStyle={{ backgroundColor: userData?.levelColor }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {areas.length > 1 ? (
              <div className="flex justify-end w-full text-center">
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
          </div>
        </div>
      </div>
    </Main>
  );
};
