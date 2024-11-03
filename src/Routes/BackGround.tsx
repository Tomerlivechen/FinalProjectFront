import React, { ReactNode } from "react";
import { colors } from "../Constants/Patterns";

const BackGround: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="relative">
        <div
          className={` inset-0 w-fit min-w-full md:min-h-screen min-h-[200vh] h-fit bg-cover bg-center overflow-y-auto overflow-x-visible=false " ${colors.ElementFrame} `}
        >
          <div className="pt-14">{children}</div>
        </div>
      </div>
    </>
  );
};

export default BackGround;
