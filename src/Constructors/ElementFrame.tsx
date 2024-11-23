import { MotionFrame } from "../Components/Objects/MotionFrame";
import { colors } from "../Constants/Patterns";
import { basicElements } from "../Types/@StructureTypes";

const ElementFrame = (props: basicElements) => {
  return (
    <>
      <MotionFrame>
        <div
          className={` p-${props.padding} ${props.tailwind}   ${
            !props.notRounded && " rounded-lg"
          } m-${props.margin || "-3"} ${colors.ElementFrame}`}
          style={{
            left: props.left,
            zIndex: props.zindex || 0,
            right: props.right || "auto",
            top: props.top,
            position: props.position || "relative",
            height: props.height,
            width: props.width,
            overflowY: props.overflowY,
            overflowX: props.overflowX,
            resize: "none",
            ...(props.direction && { direction: props.direction }),
          }}
        >
          {props.children}
        </div>
      </MotionFrame>
    </>
  );
};
export default ElementFrame;
