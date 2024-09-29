import { useGetChapters } from "@/hook/useGetChapters/useGetChapters.hook";
import { Main } from "@/ui/layouts/main.layout";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

export const Missions = () => {
  const { chapters, fetchChapters } = useGetChapters(2);

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
                    return (
                      <div key={index}>
                        <Popover>
                          <PopoverTrigger>
                            <li>
                              <img
                                src={lesson.exerciseCategory.image}
                                alt={lesson.exerciseCategory.name}
                                className="w-full max-w-32"
                              />
                            </li>
                          </PopoverTrigger>
                          <PopoverContent>{lesson.title}</PopoverContent>
                        </Popover>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="col-span-3"></div>
          </div>
        ))}
      </div>
    </Main>
  );
};
