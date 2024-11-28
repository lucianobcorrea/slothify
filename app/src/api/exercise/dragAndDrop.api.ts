import { axiosInstance } from "@/api/_base/axiosInstance";

const DRAG_AND_DROP = "/user-answer/drag-and-drop/";

interface FinalResult {
  content: string | undefined;
  category: string | undefined;
}

export async function dragAndDrop(
  exerciseId: number | undefined,
  dragAndDropList: FinalResult[],
  startDate: string,
  finalDate: string
) {
  const response = axiosInstance.post(DRAG_AND_DROP + exerciseId, {
    dragAndDropList,
    startDate,
    finalDate,
  });
  return response;
}
