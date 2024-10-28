import { useEffect, useState } from "react";
import { IAppImage } from "../../Types/@ImageTypes";
import { useParams } from "react-router-dom";
import { Images } from "../../Services/image-service";
import { isEqual } from "lodash";
import { ImageObject } from "./ImageObject";

const ImageList = () => {
  const { userId } = useParams();
  const [userIdState, setUserIdState] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [imageList, setImageList] = useState<IAppImage[] | null>();
  const [displayImageList, setDisplayImageList] = useState<IAppImage[]>();

  const getImages = async (userId: string) => {
    const respons = await Images.getUserImages(userId);
    setImageList(respons.data);
  };

  useEffect(() => {
    if (userId) {
      setUserIdState(userId);
    }
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

  return (
    <>
      {!isLoading && displayImageList && (
        <div className="flex flex-wrap">
          {displayImageList.map((image) => (
            <div className="p-2" key={image.id}>
              <ImageObject ImageObjectProps={image} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export { ImageList };
