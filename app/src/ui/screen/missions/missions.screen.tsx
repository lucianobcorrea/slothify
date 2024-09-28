import { Main } from "@/ui/layouts/main.layout";

export const Missions = () => {
  return (
    <Main>
      <div className="container min-h-screen grid grid-cols-12 gap-4">
        <div className="col-span-2 relative">
          <div className="absolute inset-0 flex justify-center">
            <div className="w-1 bg-gray-700 h-full"></div>
          </div>

          <div className="relative z-10 mt-10 space-y-12">
            <div className="flex justify-center">
              <div className="bg-pink-500 text-white p-3 rounded-full shadow-lg">
                <h2>Capítulo 1: algo que ainda vou pensar</h2>
                <span className="block w-10 h-10"></span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-purple-500 text-white p-3 rounded-full shadow-lg">
                <h2>Capítulo 2: algo que ainda vou pensar</h2>
                <span className="block w-10 h-10"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-7"></div>

        <div className="col-span-3"></div>
      </div>
    </Main>
  );
};
