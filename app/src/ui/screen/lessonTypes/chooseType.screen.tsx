import { useLocation } from "react-router-dom";
import { MultipleChoice } from "./multipleChoice.screen";
import { DragAndDrop } from "./dragAndDrop.screen";
import { Sorting } from "./sorting.screen";

export const ChooseType = () => {
  const location = useLocation();

  return (
    <>
      {location.state.exerciseType === "MULTIPLE_CHOICE" ? (
        <MultipleChoice lessonId={location.state.lessonId} />
      ) : null}

      {location.state.exerciseType === "DRAG_AND_DROP" ? (
        <DragAndDrop lessonId={location.state.lessonId} />
      ) : null}

      {location.state.exerciseType === "SORTING" ? (
        <Sorting lessonId={location.state.lessonId} />
      ) : null}
    </>
  );
};
