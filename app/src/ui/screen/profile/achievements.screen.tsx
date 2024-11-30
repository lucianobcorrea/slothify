import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Main } from "@/ui/layouts/main.layout";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Progress } from "@/components/ui/progress";
import { ButtonComponent } from "@/ui/component/button/button.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AOS from "aos";
import "aos/dist/aos.css";

export const Achievements = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openAchievements, setOpenAchievements] = useState<boolean>(false);
  const location = useLocation();
  const { achievements } =
    (location.state as { achievements: Achievement[] }) || {};
  const navigate = useNavigate();

  const [achievementImage, setAchievementImage] = useState<string>("");
  const [achievementName, setAchievementName] = useState<string>("");
  const [achievementDescription, setAchievementDescription] =
    useState<string>("");
  const [achievementTotal, setAchievementTotal] = useState<number>(0);
  const [achievementRequired, setAchievementRequired] = useState<number>(0);
  const [achievementPercentage, setAchievementPercentage] = useState<number>(0);
  const [userHasAchievement, setUserHasAchievement] = useState<boolean>(false);

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

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Main>
      <Dialog open={openAchievements} onOpenChange={setOpenAchievements}>
        <DialogContent
          className="sm:max-w-[900px] bg-neutral-850 border-0 focus-visible:outline-none text-white flex flex-col items-center"
        >
          <DialogHeader>
            <DialogTitle className="text-4xl">{achievementName}</DialogTitle>
          </DialogHeader>
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
          <DialogDescription
            className="text-white text-lg text-center flex flex-col items-center"
          >
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

        <div className="mt-10 mb-20">
          <div className="grid grid-cols-4 gap-5">
            {achievements && achievements.length > 0 ? (
              achievements.map((achievement, index) => (
                <button
                  key={achievement.id}
                  onClick={() => setAchievementData(achievement)}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-neutral-800 p-4 rounded-xl h-full flex justify-center items-center">
                    <img
                      className={`${
                        !achievement.userHas ? "grayscale" : ""
                      } max-w-[260px] h-full object-cover`}
                      src={achievement.image}
                      alt={achievement.name}
                    />
                  </div>
                </button>
              ))
            ) : (
              <p className="text-white col-span-4">Nenhum item encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </Main>
  );
};
