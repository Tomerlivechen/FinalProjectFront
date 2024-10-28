import Swal from "sweetalert2";
import { Groups } from "../Services/group-service";
import { IConfirmJoinGoupProps } from "../Types/@GroupTypes";
import { Images } from "../Services/image-service";

const showErrorDialog = (message: string) =>
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    timer: 2000,
  });
const showSuccessDialog = (message: string) =>
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer: 2000,
  });

const ConfirmJoinGroup = async (joinData: IConfirmJoinGoupProps) =>
  Swal.fire({
    title: joinData.title,
    html: joinData.text,
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: joinData.buttonText,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await Groups.JoinGroup(joinData.groupId);
      return true;
    }
  });

const ConfirmImageDelete = async (imageId: string) =>
  Swal.fire({
    title: "Are you sure?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const respons = await Images.DeleteImage(imageId);
      return respons.status;
    }
  });

const getText = async (title: string, placeholder: string) => {
  const { value: url } = await Swal.fire({
    input: "url",
    inputLabel: `Submit ${title}`,
    inputPlaceholder: placeholder,
    didOpen: () => {
      const popup = document.querySelector(".swal2-popup");
      if (popup) {
        popup.setAttribute("id", "mySweetAlertModal");
      }
    },
  });
  if (url) {
    Swal.fire(`Entered URL: ${url}`);
  }
  return url;
};

const getName = async () => {
  const { value: name } = await Swal.fire({
    input: "text",
    title: `Submit new name`,
    inputPlaceholder: "",
    didOpen: () => {
      const popup = document.querySelector(".swal2-popup");
      if (popup) {
        popup.setAttribute("id", "mySweetAlertModal");
      }
    },
  });
  return name;
};

const showImage = (title: string, image: string) =>
  Swal.fire({
    title: title,
    imageUrl: image,
    imageAlt: "your image",
  });

const showtext = (text: string) => {
  Swal.fire(text);
};

export default {
  showErrorDialog,
  showSuccessDialog,
  getText,
  showImage,
  showtext,
  ConfirmJoinGroup,
};
export const dialogs = {
  error: showErrorDialog,
  success: showSuccessDialog,
  getText,
  showImage,
  showtext,
  ConfirmJoinGroup,
  ConfirmImageDelete,
  getName,
};
