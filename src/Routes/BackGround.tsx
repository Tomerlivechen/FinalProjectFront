import React, { ReactNode ,useEffect} from "react";
import { colors } from "../Constants/Patterns";
  import { useLocation } from 'react-router-dom'

const BackGround: React.FC<{ children: ReactNode }> = ({ children }) => {

const location = useLocation();

  const setMaxZoomOut=() => {
    const metaTag = document.querySelector('meta[name="viewport"]');
    if (!metaTag) return;
    const currentContent = metaTag.getAttribute('content');
    if (currentContent && currentContent.includes('initial-scale')) {
      return; 
    }
    
    const smallScreenThreshold = 768;
    const width = window.innerWidth;    
    if (width > smallScreenThreshold) {
      return;
    }
    const deviceWidth = Math.min(1024, width); 
    const scale = deviceWidth / 320;  
    const initialScale = Math.min(1, scale); 
    const maxScale = 5;

    metaTag.setAttribute('content', `width=device-width, initial-scale=${initialScale}, maximum-scale=${maxScale}, user-scalable=yes`);
  }


    useEffect(() => {
      setMaxZoomOut();
    }, [location]); 
  

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
