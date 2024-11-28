import { Header } from "@/ui/component/header/header.component";
import { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
  itemData?: UsedItem;
}

interface UsedItem {
  subtype: string;
  duration: number | null;
  image: string;
}

export const Main = (props: LayoutProps) => {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    const key = props.itemData?.subtype || "XP_POTION";
    const storedExpiration = localStorage.getItem(key);

    let expirationTime: number | null = null;

    if (storedExpiration) {
      expirationTime = parseInt(storedExpiration, 10);
    } else if (props.itemData?.duration) {
      expirationTime = Date.now() + props.itemData.duration * 60 * 1000;
      localStorage.setItem(key, expirationTime.toString());
    }

    if (expirationTime) {
      const initialRemainingTime = Math.max(0, expirationTime - Date.now());
      setRemainingTime(Math.floor(initialRemainingTime / 1000));

      const interval = setInterval(() => {
        const timeLeft = expirationTime! - Date.now();
        if (timeLeft <= 0) {
          clearInterval(interval);
          localStorage.removeItem(key);
          setRemainingTime(null);
        } else {
          setRemainingTime(Math.floor(timeLeft / 1000));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [props.itemData]);

  return (
    <>
      <Header />
      {remainingTime !== null && (
        <div className="fixed bottom-4 left-4 bg-neutral-800 text-white shadow-lg p-4 rounded-lg border border-neutral-600 w-36 h-28 flex flex-col items-center justify-center gap-2">
          <div className="text-sm font-semibold text-neutral-400">
            Poção ativa:
          </div>
          <div className="flex items-baseline gap-1 text-lg font-bold">
            <span>{Math.floor(remainingTime / 60)}</span>
            <span>:</span>
            <span>
              {remainingTime % 60 < 10 ? "0" : ""}
              {remainingTime % 60}
            </span>
          </div>
        </div>
      )}
      {props.children}
    </>
  );
};
