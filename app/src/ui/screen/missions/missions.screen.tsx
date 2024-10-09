import { useGetChapters } from "@/hook/useGetChapters/useGetChapters.hook";
import { Main } from "@/ui/layouts/main.layout";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
import { ButtonComponent } from "@/ui/component/button/button.component";
import { useGetExplanation } from "@/hook/useGetExplanation/useGetExplanation.hook";

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
  const { chapters, fetchChapters } = useGetChapters(2);
  const { fetchExplanation } = useGetExplanation();

  useEffect(() => {
    fetchChapters();
  }, []);

  return (
    <Main>
      <div className="container grid">
        {chapters.map((chapter) => (
          <div key={chapter.title} className="grid grid-cols-12">
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
                  {chapter.lessons.map((lesson, index) => {
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
                      <div key={index}>
                        <Popover>
                          <PopoverTrigger>
                            <li className={`relative ${marginClass}`}>
                              <img
                                src={lesson.exerciseCategory.image}
                                alt={lesson.exerciseCategory.name}
                                className="w-full max-w-32"
                              />
                            </li>
                          </PopoverTrigger>
                          <PopoverContent className="text-center bg-neutral-700 border-neutral-500">
                            <h2 className="text-white text-xl font-bold">
                              {lesson.title}
                            </h2>
                            <ButtonComponent
                              clickEvent={() =>
                                fetchExplanation(lesson.id, lesson.exerciseType)
                              }
                              btnType="button"
                              classname="mt-4 bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color"
                            >
                              Iniciar
                            </ButtonComponent>
                          </PopoverContent>
                        </Popover>
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

            <div className="col-span-3"></div>
          </div>
        ))}
      </div>
    </Main>
  );
};
