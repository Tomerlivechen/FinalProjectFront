import { useEffect, useState } from "react";
import ElementFrame from "../../Constructors/ElementFrame";

import { IAppImage } from "../../Types/@ImageTypes";
import { useUser } from "../../CustomHooks/useUser";
import { colors } from "../../Constants/Patterns";
import { Tooltip } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { dialogs } from "../../Constants/AlertsConstant";
import { MdOutlineContentCopy } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Images } from "../../Services/image-service";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { RxOpenInNewWindow } from "react-icons/rx";
import DinoSpinner from "../../Spinners/DinoSpinner";

const ImageObject: React.FC<{
  ImageObjectProps: IAppImage;
}> = ({ ImageObjectProps }) => {
  const userContext = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [imageObject, setImageObject] = useState<IAppImage | null>(null);

  const deleteImage = async () => {
    if (imageObject) {
      const respons = await dialogs.ConfirmImageDelete(imageObject.id);
      if (respons === 200) {
        dialogs.success("image deleted successfully");
      } else {
        dialogs.error(`Unable to delete image , ${respons}`);
      }
    }
  };
  const openImage = async () => {
    if (imageObject) {
      dialogs.showImage(imageObject.title, imageObject.url);
    }
  };
  const copyImageLink = async () => {
    if (imageObject) {
      await navigator.clipboard.writeText(imageObject.url);
      dialogs.success("Image copied to clipboard");
    }
  };

  const RenameImage = async () => {
    if (imageObject) {
      const newName = await dialogs.getName();
      const respons = await Images.RenameImage(imageObject.id, newName);
      if (respons.status === 200) {
        dialogs.success("image renamed successfully");
      } else {
        dialogs.error(`Unable to rename image , ${respons}`);
      }
    }
  };

  const togglePrivate = async () => {
    if (imageObject) {
      const respons = await Images.togglePrivat(imageObject.id);
      if (respons.status === 200) {
        dialogs.success(`image is now ${respons.data ? "public" : "private"}`);
      } else {
        dialogs.error(`Unable to rename image , ${respons}`);
      }
    }
  };

  const openInNewWindow = async () => {
    if (imageObject) {
      window.open(imageObject.url, "_blank");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (
      ImageObjectProps.public ||
      userContext.userInfo.UserId == ImageObjectProps.userId
    ) {
      setImageObject(ImageObjectProps);
    }

    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <DinoSpinner size={20} />}
      {!isLoading && imageObject && (
        <>
          <div>
            <Tooltip title={`image of ${imageObject.title}`}>
              <ElementFrame
                tailwind={`h-48 w-48 border-2 border-y-amber-700  border-x-teal-500 flex flex-col items-center justify-center hover:cursor-pointer`}
              >
                <div className="flex">
                  <Tooltip title={imageObject.title}>
                    {
                      <div className="font-bold">
                        {imageObject.title.slice(0, 30)}
                        {imageObject.title.length > 30 && "..."}
                      </div>
                    }
                  </Tooltip>
                  {(userContext.userInfo.IsAdmin == "true" ||
                    userContext.userInfo.UserId == imageObject.userId) && (
                    <button
                      className={`${colors.CommentColors} rounded-xl`}
                      onClick={() => RenameImage()}
                    >
                      <Tooltip title={`Rename Image`}>
                        <BiEdit size={18} />
                      </Tooltip>
                    </button>
                  )}
                </div>
                {(userContext.userInfo.IsAdmin == "true" ||
                  userContext.userInfo.UserId == imageObject.userId) && (
                  <div className="absolute top-1 right-0 hover:cursor-pointer">
                    <button
                      className={`${colors.CommentColors} rounded-xl`}
                      onClick={() => deleteImage()}
                    >
                      <Tooltip title={`Delete Image`}>
                        <IoClose size={18} />
                      </Tooltip>
                    </button>
                  </div>
                )}
                <div className="h-full w-full relative overflow-hidden">
                  <img
                    src={imageObject.url}
                    className="w-full h-full object-cover"
                    onClick={() => openImage()}
                  />
                </div>
                <Tooltip title={`Delete Image`}>
                  <button
                    className={`${colors.Buttons} p-2 rounded-xl absolute bottom-6 right-2 z-10`}
                    onClick={copyImageLink}
                  >
                    <MdOutlineContentCopy />
                  </button>
                </Tooltip>
                {(userContext.userInfo.IsAdmin == "true" ||
                  userContext.userInfo.UserId == imageObject.userId) && (
                  <Tooltip
                    title={`Set privacy currently ${
                      imageObject.public ? "Public" : "Private"
                    } `}
                  >
                    <button
                      className={`${colors.Buttons} p-2 rounded-xl absolute bottom-6 left-2 z-10`}
                      onClick={togglePrivate}
                    >
                      {imageObject.public ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </Tooltip>
                )}
                <Tooltip title={`Open in new tab`}>
                  <button
                    className={`${colors.Buttons} p-2 rounded-xl absolute bottom-6 left-20 z-10`}
                    onClick={openInNewWindow}
                  >
                    <RxOpenInNewWindow size={18} />
                  </button>
                </Tooltip>
                <div className="h-6">{imageObject.datetime}</div>
              </ElementFrame>
            </Tooltip>
          </div>
        </>
      )}
    </>
  );
};

export { ImageObject };
