import { Main } from "@/ui/layouts/main.layout";
import firstPlace from "@/assets/image/ranking/1-place.png";
import secondPlace from "@/assets/image/ranking/2-place.png";
import thirdPlace from "@/assets/image/ranking/3-place.png";
import { useGetRanking } from "@/hook/useGetRanking/useGetRanking.hook";
import { useEffect, useRef, useCallback } from "react";
import { LoadingSpinner } from "@/ui/component/spinner/spinner.component";

export const Ranking = () => {
  const { ranking, fetchRanking, hasMore, isLoading } = useGetRanking(0);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastRankingElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchRanking();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    fetchRanking();
  }, []);

  return (
    <Main>
      <section className="container px-64">
        <h1 className="text-white text-4xl font-bold mt-14">
          Ranking de Jogadores
        </h1>

        <div className="bg-neutral-800 border-[1px] border-neutral-700 mt-12 p-8 rounded-xl mb-12">
          <div className="overflow-y-auto pe-10 max-h-[700px] custom-scroll">
            {ranking.map((user, index) => (
              <div
                key={user.id}
                ref={
                  index === ranking.length - 1 ? lastRankingElementRef : null
                }
              >
                <div className="flex items-center justify-between">
                  {index === 0 ? (
                    <img
                      className="max-w-[75px] w-full"
                      src={firstPlace}
                      alt="Medalha dourada de primeiro lugar"
                    />
                  ) : index === 1 ? (
                    <img
                      className="max-w-[75px] w-full"
                      src={secondPlace}
                      alt="Medalha de prata de segundo lugar"
                    />
                  ) : index === 2 ? (
                    <img
                      className="max-w-[75px] w-full"
                      src={thirdPlace}
                      alt="Medalha de bronze de terceiro lugar"
                    />
                  ) : (
                    <h1 className="text-[40px] text-white font-bold">
                      {index + 1}.
                    </h1>
                  )}
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{ backgroundColor: user.color }}
                  >
                    <img
                      className="w-full max-w-32"
                      src={user.avatar}
                      alt="Imagem de perfil do usuário"
                    />
                  </div>
                  <h2 className="text-white text-3xl font-medium">
                    {user.username}
                  </h2>
                  <h3 className="text-secondary-color text-xl font-bold">
                    {user.rankingPoint}
                  </h3>
                </div>
                <hr className="border-1 border-neutral-500 my-6" />
              </div>
            ))}
            <div className="flex justify-center">
              {isLoading && (
                <LoadingSpinner className="text-primary-color" size={46} />
              )}
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};