import { useLocation } from "react-router-dom";
import { MultipleChoice } from "./multipleChoice.screen";

export const ChooseType = () => {
  const location = useLocation();

  return (
    <>
      {location.state.exerciseType === "MULTIPLE_CHOICE" ? (
        <MultipleChoice lessonId={location.state.lessonId}/>
      ) : null}
    </>
  );
};
