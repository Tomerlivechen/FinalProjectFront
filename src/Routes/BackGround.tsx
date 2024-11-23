import React, { ReactNode, useEffect } from "react";
import { colors } from "../Constants/Patterns";
import { useLocation } from "react-router-dom";

const BackGround: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();

  const updateScale = (scale: number) => {
    const metaViewPort = document.querySelector('meta[name="viewport"]');
    if (metaViewPort) {
      metaViewPort.setAttribute(
        "content",
        `width=device-width, initial-scale=${scale}`
      );
    }
  };

  useEffect(() => {
    updateScale(1);
  }, [location]);

  return (
    <>
      <div className="relative">
        <div
          className={` inset-0 w-fit min-w-full md:min-h-screen min-h-[200vh] h-fit bg-cover bg-center overflow-y-auto overflow-x-visible=false  " ${colors.ElementFrame} `}
        >
          <div className="pt-14 pl-14 ">{children}</div>
        </div>
      </div>
    </>
  );
};

export default BackGround;
