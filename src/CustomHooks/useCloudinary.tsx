import axios from "axios";
import { useEffect, useState } from "react";
import { dialogs } from "../Constants/AlertsConstant";
import { Images } from "../Services/image-service";

const useCloudinary = (): [
  string, // imageUrl
  File | null, // file
  (file: File) => void, // holdFile
  (file: File | null) => Promise<void>, // handleSetImageURL
  () => void // clear
] => {
  const [imageUrl, setImageURL] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const clear = () => {
    setImageURL("");
    setFile(null);
  };

  useEffect(() => {
    if (file) {
      const fileSizeInBytes = file.size;
      const fileSizeInMB = fileSizeInBytes / 1048576;
      if (fileSizeInMB > 2) {
        dialogs.error("File Larger than Limit (2MB)");
        clear();
      }
    }
  }, [file]);

  const uploadToCloudinary = async (file: File): Promise<void> => {
    const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Default_Project_Preset");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        formData
      );
      setImageURL(response.data.secure_url);
      Images.postImage(response.data.secure_url);
    } catch (e) {
      console.error(e);
      dialogs.error("Image upload failed");
    }
  };

  const handleSetImageURL = async (setfile: File | null) => {
    if (setfile) {
      setFile(setfile);
      await uploadToCloudinary(setfile);
      if (setfile == null && file) {
        await uploadToCloudinary(file);
      }
    }
  };

  const holdFile = (file: File) => {
    setFile(file);
  };

  return [imageUrl, file, holdFile, handleSetImageURL, clear];
};

export { useCloudinary };
