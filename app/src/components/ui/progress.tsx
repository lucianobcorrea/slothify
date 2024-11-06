import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface AdditionalProgressProps {
  indicatorClassName?: string;
  indicatorStyle?: React.CSSProperties; 
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root> & AdditionalProgressProps,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & AdditionalProgressProps
>(({ className, value, indicatorClassName, indicatorStyle, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full w-full flex-1 transition-all", indicatorClassName)}
      style={{
        ...indicatorStyle, // Aplica o estilo passado
        transform: `translateX(-${100 - (value || 0)}%)`
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
