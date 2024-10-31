import emailjs from "emailjs-com";

import { IAppUserDisplay } from "../Models/UserModels";


export interface ReNewPasswordDTO {
    userEmail : string;
    token : string;
    newPassword : string;
}

export interface ReSetPassword {
    tokenDTO : ReNewPasswordDTO;
    userInfo : IAppUserDisplay;
}

const SendRecoveyEmail = async (paswwordReset : ReSetPassword) => {
  // eslint-disable-next-line no-debugger
  debugger
  const basePath = window.location.origin;
  const templateParams = {
    to_name: paswwordReset.userInfo.first_Name,
    to_email: paswwordReset.userInfo.email,
    message: `${paswwordReset.userInfo.first_Name} you have requested a reset passward for your account at Deinonychus , follow the link below to reset your password `,
    url: `${basePath}/recover/${base64url(paswwordReset.tokenDTO.token)}`,
    subject: `Password reset Deinonychus`,
  };
  try {
    emailjs
      .send(
        "service_9dzu11b",
        "template_r0869zr",
        templateParams,
        "GAL26WnyuEimicz1J"
      )
      .then(
        (response) => {
          console.log("SUCCESS!",response);
        },
        (error) => {
          console.log("FAILED...",error);
        }
      );
  } catch (error ) { console.log("FAILED...",error);}
};

export { SendRecoveyEmail };


