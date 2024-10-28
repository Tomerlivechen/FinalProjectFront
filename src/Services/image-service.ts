import { request } from "../Utils/Axios-Interceptor";

const ImageURL = "/Image";


const postImage = (imageURL: string) =>
    request({
      url: `${ImageURL}`,
      method: "POST",
      data: imageURL,
  });

  const getUserImages = (userId: string) =>
    request({
      url: `${ImageURL}/${userId}`,
      method: "GET",
      data: null,
  });

  const DeleteImage = (imageId: string) =>
    request({
      url: `${ImageURL}/${imageId}`,
      method: "DELETE",
      data: null,
  });

  const togglePrivat = (imageId: string) =>
    request({
      url: `${ImageURL}/"togglePrivatebyId/${imageId}`,
      method: "PUT",
      data: null,
  });

  const RenameImage = (imageId: string, name:string) =>
    request({
      url: `${ImageURL}/${imageId}`,
      method: "PUT",
      data: name,
  });

  export const Images = {postImage, getUserImages, DeleteImage, RenameImage,togglePrivat}