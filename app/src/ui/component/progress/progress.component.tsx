import { Progress } from "@/components/ui/progress";

interface ProgressProps {
  progressValue: number;
}

export const ProgressComponent = (props: ProgressProps) => {
  return (
    <Progress
      value={props.progressValue}
      className="w-full bg-neutral-500 h-5"
      indicatorClassName="bg-primary-color"
    />
  );
};
