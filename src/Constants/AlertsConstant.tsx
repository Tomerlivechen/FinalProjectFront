import Swal from "sweetalert2";
import { Groups } from "../Services/group-service";
import { IConfirmJoinGoupProps } from "../Types/@GroupTypes";

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

const ConfirmJoinGroup = (joinData: IConfirmJoinGoupProps) =>
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
};
