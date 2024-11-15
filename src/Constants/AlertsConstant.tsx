import Swal from "sweetalert2";
import { Groups } from "../Services/group-service";
import { IConfirmJoinGoupProps } from "../Types/@GroupTypes";
import { Images } from "../Services/image-service";
import { IAppUserDisplay } from "../Models/UserModels";

const getBGTheme = () => {
  const Theme = localStorage.getItem("preferedmode")?.toString();
  if (Theme == `dark`) {
    return "#111827";
  } else {
    return "#dbeafe";
  }
};

const getTextTheme = () => {
  const Theme = localStorage.getItem("preferedmode")?.toString();
  if (Theme == `dark`) {
    return "#fb923c";
  } else {
    return "#1e3a8a";
  }
};

const showErrorDialog = (message: string) =>
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    width: 200,
    heightAuto: false,
    background: `${getBGTheme()}`,
    color: `${getTextTheme()}`,
    timer: 2000,
  });
const showSuccessDialog = (message: string) =>
  Swal.fire({
    icon: "success",
    title: "Success",
    width: 200,
    heightAuto: false,
    background: `${getBGTheme()}`,
    color: `${getTextTheme()}`,
    text: message,
    timer: 2000,
  });
const ConfirmJoinGroup = async (joinData: IConfirmJoinGoupProps) =>
  Swal.fire({
    title: joinData.title,
    html: joinData.text,
    icon: "info",
    background: `${getBGTheme()}`,
    color: `${getTextTheme()}`,
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
const ConfirmRemoveFromGroup = async (User: IAppUserDisplay) =>
  Swal.fire({
    title: "Are you sure?",
    html: `Confirm Remove ${User.userName} From Group`,
    icon: "warning",
    showCancelButton: true,
    background: `${getBGTheme()}`,
    color: `${getTextTheme()}`,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `Confirm`,
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
const ConfirmImageDelete = async (imageId: string) =>
  Swal.fire({
    title: "Are you sure?",
    icon: "question",
    showCancelButton: true,
    width: 200,
    heightAuto: false,
    background: `${getBGTheme()}`,
    color: `${getTextTheme()}`,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const respons = await Images.DeleteImage(imageId);
      return respons.status;
    }
  });
const getURL = async (title: string, placeholder: string) => {
  const { value: url } = await Swal.fire({
    input: "url",
    inputLabel: `Submit ${title}`,
    inputPlaceholder: placeholder,
    background: `${getBGTheme()}`,
    color: `${getTextTheme()}`,
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

const getText = async (
  title: string,
  placeholder: string,
  textValue?: string
) => {
  const inputValue = textValue;
  const { value: text } = await Swal.fire({
    input: "text",
    inputLabel: `Submit ${title}`,
    inputValue,
    inputPlaceholder: placeholder,
    background: `${getBGTheme()}`,
    color: `${getTextTheme()}`,
    didOpen: () => {
      const popup = document.querySelector(".swal2-popup");
      if (popup) {
        popup.setAttribute("id", "mySweetAlertModal");
      }
    },
  });
  return text;
};

const getEmail = async () => {
  const { value: email } = await Swal.fire({
    title: "Input email address",
    input: "email",
    background: `${getBGTheme()}`,
    color: `${getTextTheme()}`,
    inputLabel: "Your email address",
    inputPlaceholder: "Enter your email address",
  });
  if (email) {
    Swal.fire(`Entered email: ${email}`);
  }
  return email;
};

const getName = async () => {
  const { value: name } = await Swal.fire({
    input: "text",
    title: `Submit new name`,
    background: `${getBGTheme()}`,
    color: `${getTextTheme()}`,
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
    background: `${getBGTheme()}`,
    color: `${getTextTheme()}`,
    imageAlt: "your image",
  });
const showtext = (text: string) => {
  Swal.fire({
    background: `${getBGTheme()}`,
    color: `${getTextTheme()}`,
    text,
  });
};

export default {
  showErrorDialog,
  showSuccessDialog,
  getURL,
  showImage,
  showtext,
  ConfirmJoinGroup,
};
export const dialogs = {
  error: showErrorDialog,
  success: showSuccessDialog,
  getURL,
  getText,
  showImage,
  showtext,
  ConfirmJoinGroup,
  ConfirmImageDelete,
  getName,
  getEmail,
  ConfirmRemoveFromGroup,
};
