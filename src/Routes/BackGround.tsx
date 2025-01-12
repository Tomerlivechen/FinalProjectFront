import React, { ReactNode } from "react";
import { colors } from "../Constants/Patterns";

import { MotionFrame } from "../Components/Objects/MotionFrame";

const BackGround: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className=" relative">
        <div
          className={` inset-0  w-fit md:min-w-full md:min-h-screen min-h-[200vh] h-fit bg-cover bg-center overflow-y-auto overflow-x-visible=false  " ${colors.ElementFrame} `}
        >
          <div className="pt-14 md:pl-14 pl-6 flex justify-center items-center  ">
            <MotionFrame>{children}</MotionFrame>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackGround;
