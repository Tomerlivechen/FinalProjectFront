import React, { ReactNode, useEffect } from "react";
import { colors, updateScale } from "../Constants/Patterns";

import { MotionFrame } from "../Components/Objects/MotionFrame";
import { useLocation } from "react-router-dom";

const BackGround: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    document.body.style.zoom = "1";
    updateScale(0.7);
  }, [location]);

  return (
    <>
      <div className="relative">
        <div
          className={` inset-0  w-fit min-w-full md:min-h-screen min-h-[200vh] h-fit bg-cover bg-center overflow-y-auto overflow-x-visible=false  " ${colors.ElementFrame} `}
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
