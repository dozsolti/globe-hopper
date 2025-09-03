

import { cn } from "@/lib/utils";
import { motion, type MotionProps, useScroll } from "motion/react";
import React from "react";

type ScrollProgressProps = Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "top-0 z-50 fixed inset-x-0 bg-gradient-to-r from-primary to-white/80 h-px origin-left",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";
