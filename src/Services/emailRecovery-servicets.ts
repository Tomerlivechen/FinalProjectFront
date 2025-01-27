import emailjs from "emailjs-com";
import * as URLencode from 'urlencode';

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
// using emailjs service to send recovery email
const SendRecoveyEmail = async (paswwordReset : ReSetPassword) => {
  const basePath = window.location.origin;
  const templateParams = {
    to_name: paswwordReset.userInfo.first_Name,
    to_email: paswwordReset.userInfo.email,
    message: `${paswwordReset.userInfo.first_Name} you have requested a reset passward for your account at Deinonychus , follow the link below to reset your password `,
    url: `${basePath}/recover?token=${URLencode.encode(paswwordReset.tokenDTO.token)}`,
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
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.error("FAILED...",error);
        }
      );
  } catch (error ) { console.error("FAILED...",error);}
};

export { SendRecoveyEmail };


