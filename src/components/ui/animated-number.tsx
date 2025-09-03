
import { cn } from "@/lib/utils";
import {
  motion,
  type SpringOptions,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, type JSX } from "react";

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: React.ElementType;
  delay?: number;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = "span",
  delay = .1 * 1000,
}: AnimatedNumberProps) {
  const MotionComponent = motion.create(as as keyof JSX.IntrinsicElements);

  const spring = useSpring(0, springOptions);
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    setTimeout(() => {
      spring.set(value);
    }, delay);
  }, [delay, spring, value]);

  return (
    <MotionComponent className={cn("tabular-nums", className)}>
      {display}
    </MotionComponent>
  );
}
