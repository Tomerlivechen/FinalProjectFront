import { useEffect, useState } from "react";
import { IAppImage, IImageListPops } from "../../Types/@ImageTypes";
import { useSearchParams } from "react-router-dom";
import { Images } from "../../Services/image-service";
import { isEqual } from "lodash";
import { ImageObject } from "./ImageObject";
import { colors, sortByProperty } from "../../Constants/Patterns";
import ResizableFrame from "./ResizableFrame";
import ElementFrame from "../../Constructors/ElementFrame";
import { Tooltip } from "react-bootstrap";
import { useUser } from "../../CustomHooks/useUser";

const ImageList: React.FC<{
  ImageListProps: IImageListPops;
}> = ({ ImageListProps }) => {
  const [searchParams] = useSearchParams();

  const userContext = useUser();
  const [userIdState, setUserIdState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState<IAppImage[] | null>();
  const [displayImageList, setDisplayImageList] = useState<IAppImage[]>();
  const [open, setOpen] = useState(false);

  const [userId, setUserId] = useState<null | string>(null);
  // get userID from the search params
  const getSearchParams = () => {
    const _userId = searchParams.get("userId");
    if (_userId) {
      if (!isEqual(userId, _userId)) {
        setUserId(_userId);
      }
    }
  };

  useEffect(() => {
    getSearchParams();
  }, [open]);
  // get user image list from the database
  const getImages = async (userId: string) => {
    const respons = await Images.getUserImages(userId);
    setImageList(respons.data);
  };

  useEffect(() => {
    if (userId) {
      setUserIdState(userId);
    } else {
      if (userContext.userInfo.UserId) {
        setUserIdState(userContext.userInfo.UserId);
      }
    }
    setOpen(ImageListProps.open);
  }, [userId]);
  //sort the images by age
  useEffect(() => {
    if (imageList) {
      if (!isEqual(imageList, displayImageList)) {
        setIsLoading(true);
        setDisplayImageList(imageList.sort(sortByProperty("datetime", "desc")));
      }
    }
    if (displayImageList) {
      setIsLoading(false);
    }
  }, [displayImageList, userId, imageList]);

  useEffect(() => {
    if (userIdState) {
      getImages(userIdState);
    }
  }, [userIdState, open]);

  const toggleImages = () => {
    setOpen((prev) => !prev);
    ImageListProps.setOpen(!open);
  };

  return (
    <>
      <div className="w-full">
        <div className={`flex flex-col`}>
          <ElementFrame padding="1">
            <Tooltip title={`${open ? `Close ` : `Open `} Gallery`}>
              <div
                className={`${colors.Buttons} h-10 w-fit flex items-center justify-center whitespace-nowrap rounded-xl p-2 mx-auto`}
              >
                <button onClick={toggleImages}>
                  {open ? `Exit ` : `Open `}
                  Image Gallery
                </button>
              </div>
            </Tooltip>{" "}
          </ElementFrame>
          {!isLoading && displayImageList && open && (
            <ResizableFrame title={`Gallery`} show={open} setShow={setOpen}>
              <div className="flex flex-wrap mt-2">
                {displayImageList.map((image) => (
                  <div className="p-1" key={image.id}>
                    <ImageObject ImageObjectProps={image} />
                  </div>
                ))}
              </div>
            </ResizableFrame>
          )}
        </div>
      </div>
    </>
  );
};

export { ImageList };
