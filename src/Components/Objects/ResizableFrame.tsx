import React, { useEffect, useState } from "react";
import ElementFrame from "../../Constructors/ElementFrame";
import { SlSizeFullscreen } from "react-icons/sl";
import { SlSizeActual } from "react-icons/sl";
import { GrClose } from "react-icons/gr";
import { HiMiniMinus } from "react-icons/hi2";
import { colors } from "../../Constants/Patterns";
import {
  ResizableFrameButtonProps,
  ResizableFrameProps,
} from "../../Types/@StructureTypes";

const ResizableFrame: React.FC<ResizableFrameProps> = (
  props: ResizableFrameProps
) => {
  const [selectedSize, setSelectedSize] = useState<
    "min" | "mid" | "max" | "closed"
  >("mid");
  const [show, setShow] = useState(false);
  const [sizeSet, setsizeSet] = useState({
    min: false,
    mid: props.noMid ? false : true,
    max: props.noMid ? true : false,
    closed: false,
  });
  const [frameHeight, setFrameHeight] = useState("h-fit");

  //change size of frame acording to chjanges in selectedSize
  useEffect(() => {
    if (selectedSize === "closed") {
      setShow(false);
    }
    if (selectedSize === "min") {
      setFrameHeight("h-0");
    }
    if (selectedSize === "mid") {
      setFrameHeight("h-fit max-h-[50vh]");
    }
    if (selectedSize === "max") {
      setFrameHeight("h-screen");
    }
  }, [selectedSize]);

  useEffect(() => {
    setShow(props.show);
  }, []);

  useEffect(() => {
    if (props.setShow) {
      props.setShow(!sizeSet.closed);
    }
    setShow(!sizeSet.closed);
  }, [sizeSet]);

  const toggleBoolean = (size: "min" | "mid" | "max" | "closed") => {
    setsizeSet({
      min: false,
      mid: false,
      max: false,
      closed: false,
      [size]: true,
    });
    setSelectedSize(size);
  };

  const IconButton: React.FC<ResizableFrameButtonProps> = (e) => {
    return (
      <button
        className={`${
          !e.activeHook
            ? colors.ButtonFont + " cursor-pointer"
            : colors.ButtonFontDisabled
        }`}
        disabled={e.activeHook}
        onClick={() => toggleBoolean(e.size)}
      >
        <e.icon size={18} />
      </button>
    );
  };

  return (
    <>
      {show && (
        <div className={`${props.tailwindProps}`}>
          <div
            className={`${colors.ElementFrame} rounded-t-xl ${
              sizeSet.min && "rounded-b-xl"
            }  `}
          >
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center">
                <IconButton
                  icon={GrClose}
                  activeHook={sizeSet.closed}
                  size="closed"
                />
              </div>
              <div className={`${colors.ActiveText}`}>{props.title}</div>
              <div className="flex space-x-2">
                <IconButton
                  icon={HiMiniMinus}
                  activeHook={sizeSet.min}
                  size="min"
                />
                {!props.noMid && (
                  <IconButton
                    icon={SlSizeActual}
                    activeHook={sizeSet.mid}
                    size="mid"
                  />
                )}
                <IconButton
                  icon={SlSizeFullscreen}
                  activeHook={sizeSet.max}
                  size="max"
                />
              </div>
            </div>
          </div>
          <ElementFrame
            tailwind={frameHeight}
            width={props.whidth}
            padding="0 rounded-b-xl"
            overflowX={props.overflowX ? "auto" : "hidden"}
            notRounded={true}
          >
            <div>{props.children}</div>
          </ElementFrame>
        </div>
      )}
    </>
  );
};

export default ResizableFrame;
