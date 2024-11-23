import { motion as m } from "framer-motion";
import { ReactNode } from "react";

export const MotionFrame = ({ children }: { children: ReactNode }) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {children}
    </m.div>
  );
};
