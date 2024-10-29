import { useEffect, useState } from "react";
import { IAppImage, IImageListPops } from "../../Types/@ImageTypes";
import { useParams } from "react-router-dom";
import { Images } from "../../Services/image-service";
import { isEqual } from "lodash";
import { ImageObject } from "./ImageObject";
import { colors } from "../../Constants/Patterns";
import ResizableFrame from "./ResizableFrame";
import ElementFrame from "../../Constructors/ElementFrame";
import { Tooltip } from "react-bootstrap";

const ImageList : React.FC<{
  ImageListProps: IImageListPops
}> = ({ ImageListProps }) => {
  const { userId } = useParams();
  const [userIdState, setUserIdState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState<IAppImage[] | null>();
  const [displayImageList, setDisplayImageList] = useState<IAppImage[]>();
  const [open, setOpen] = useState(false);

  const getImages = async (userId: string) => {
    const respons = await Images.getUserImages(userId);
    setImageList(respons.data);
  };

  useEffect(() => {
    if (userId) {
      setUserIdState(userId);
    }
    setOpen(ImageListProps.open)
  }, []);

  useEffect(() => {
    if (imageList) {
      if (!isEqual(imageList, displayImageList)) setIsLoading(true);
      setDisplayImageList(imageList);
    }
  }, [imageList]);

  useEffect(() => {
    if (displayImageList) {
      setIsLoading(false);
    }
  }, [displayImageList]);

  const intervalTime = 10000;
  useEffect(() => {
    const interval = setInterval(() => {
      getImages(userIdState);
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

const toggleImages = () => {
  setOpen((prev) => (!prev))
  ImageListProps.setOpen(!open)
};


  return (
    <>
<div className={`flex flex-col`}>
<ElementFrame padding="1">
  <Tooltip title={`${open ? `Close `: `Open `} Gallery`} >
  <div className={`${colors.Buttons} h-10 w-fit flex items-center justify-center whitespace-nowrap rounded-xl p-2 mx-auto`}>
  <button onClick={toggleImages}>
    {open ? `Close `: `Open `}
Gallery
  </button>
  </div></Tooltip> </ElementFrame>
  {(!isLoading && displayImageList && open ) && (
<ResizableFrame title={`Gallery`} show={open} setShow={setOpen} >
  

        <div className="flex flex-wrap mt-2">
          {displayImageList.map((image) => (
            <div className="p-1" key={image.id}>
              <ImageObject ImageObjectProps={image} />
            </div>
          ))}
        </div>
       </ResizableFrame>)}
      </div>
    </>
    
  );
};

export { ImageList };
