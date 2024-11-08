import { useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { IoIosColorPalette } from "react-icons/io";
import { IoAccessibilitySharp } from "react-icons/io5";
import { colors } from "../Constants/Patterns";
import ElementFrame from "../Constructors/ElementFrame";
import { GrZoomIn } from "react-icons/gr";
import { GrZoomOut } from "react-icons/gr";
import { MdInvertColorsOff } from "react-icons/md";
import { MdInvertColors } from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";
import { IContrastProps, IZoomProps } from "../Types/@StructureTypes";

const AccessabilityPanel = () => {
  const [contrast, setcontrast] = useState<IContrastProps>({
    color: true,
    blackAndWhite: false,
    colorContrast: false,
  });
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState<IZoomProps>({ zoom: 1 });

  const toggleGrayscale = () => {
    if (contrast.color) {
      setcontrast((prev) => ({ ...prev, color: false, blackAndWhite: true }));
      document.body.classList.toggle("blackAndWhite");
      localStorage.setItem("blackAndWhite", "false");
    }
    if (contrast.blackAndWhite) {
      setcontrast((prev) => ({ ...prev, color: true, blackAndWhite: false }));
      document.body.classList.toggle("blackAndWhite");
      localStorage.setItem("blackAndWhite", "true");
    }
  };

  const toggleContrast = () => {
    if (contrast.colorContrast) {
      setcontrast((prev) => ({ ...prev, colorContrast: false }));
      document.body.classList.toggle("setContrast");
      localStorage.setItem("contrast", "true");
    }
    if (!contrast.colorContrast) {
      setcontrast((prev) => ({ ...prev, colorContrast: true }));
      document.body.classList.toggle("setContrast");
      localStorage.setItem("contrast", "false");
    }
  };

  useEffect(() => {
    const contrast = localStorage.getItem("contrast")?.toString();
    const BnW = localStorage.getItem("blackAndWhite")?.toString();
    if (contrast == "true") {
      document.body.classList.toggle("setContrast");
    }
    if (BnW == "true") {
      document.body.classList.toggle("setContrast");
    }
  }, []);

  const toggleZoom = () => {
    const newZoom = (zoom.zoom + 0.2) % 3;
    if (newZoom >= 1) {
      setZoom({ zoom: newZoom });
      document.body.style.transform = `scale(${newZoom})`;
      document.body.style.transformOrigin = "top left";
    } else {
      setZoom({ zoom: 1 });
      document.body.style.transform = `scale(${1})`;
      document.body.style.transformOrigin = "top left";
    }
  };

  const toggleZoomOut = () => {
    const newZoom = (zoom.zoom - 0.2) % 3;
    if (newZoom >= 1) {
      setZoom({ zoom: newZoom });
      document.body.style.transform = `scale(${newZoom})`;
      document.body.style.transformOrigin = "top left";
    } else {
      setZoom({ zoom: 1 });
      document.body.style.transform = `scale(${1})`;
      document.body.style.transformOrigin = "top left";
    }
  };

  const toggleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  return (
    <>
      <button className="absolute top-40 left-0  z-50 ">
        <Tooltip
          title="Accessibility"
          aria-description="Accessibility Panel"
          onClick={() => toggleOpen()}
        >
          <IoAccessibilitySharp
            size={40}
            className={`${colors.ElementFrame} rounded-xl p-1`}
          />
        </Tooltip>
      </button>
      {open && (
        <>
          <ElementFrame
            height="250px"
            width="250px"
            padding="2"
            tailwind="absolute top-36 left-10 border-2  border-orange-500"
            zindex={1000}
          >
            <div
              className={`${colors.ActiveText}  flex justify-center text-center space-x-2 `}
            >
              <div className="flex items-center">Accessibility Panel</div>
            </div>
            <div className="h-5"></div>
            <div>
              <button
                className={`flex items-center gap-3 space-x-2 ${colors.ButtonFont} font-bold pl-1`}
                onClick={() => toggleContrast()}
              >
                {contrast.colorContrast ? (
                  <IoColorPaletteOutline size={40} />
                ) : (
                  <IoIosColorPalette size={40} />
                )}
                Color Contrast
              </button>
              <div className="h-5"></div>
              <button
                className={`flex items-center gap-3 space-x-2 ${colors.ButtonFont} font-bold pl-1`}
                onClick={() => toggleGrayscale()}
              >
                {contrast.color ? (
                  <MdInvertColorsOff size={40} />
                ) : (
                  <MdInvertColors size={40} />
                )}
                Gray Scale
              </button>
              <div className="h-5"></div>
              <div className="flex space-x-4">
                <button
                  className={`flex items-center gap-3 space-x-2 ${colors.ButtonFont} font-bold pl-1`}
                  onClick={() => toggleZoom()}
                >
                  <GrZoomIn size={35} />
                  Adjust zoom {Math.round(zoom.zoom * 100)}%
                </button>
                <button
                  className={`flex items-center gap-3 space-x-2 ${colors.ButtonFont} font-bold pl-1`}
                  onClick={() => toggleZoomOut()}
                >
                  <GrZoomOut size={35} />
                </button>
              </div>
            </div>
          </ElementFrame>
        </>
      )}
    </>
  );
};

export { AccessabilityPanel };
