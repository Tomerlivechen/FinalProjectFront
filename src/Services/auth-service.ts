
import { request } from "../Utils/Axios-Interceptor";
import {  IAppUserEdit } from "../Models/UserModels";
import { IAppUserRegister } from "../Models/AuthModels";
import { ReNewPasswordDTO } from "./emailRecovery-servicets";



const AuthURL = "/Auth";


const register = (user : IAppUserRegister) =>
  request({
    url: `${AuthURL}/register`,
    method: "POST",
    data: user,
  });


  const login = async (email: string, password: string) => {
    return request({
      url: `${AuthURL}/login`,
      method: "POST",
      data: { email, password },
    }).then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response;
    });
  };

  const validate = () =>
    request({
      url: `${AuthURL}/validateToken`,
      method: "GET",
      data: null,
    });


    const getUser = (id: string) =>
      request({
        url: `${AuthURL}/ById/${id}`,
        method: "GET",
        data: null,
    });

    
const toggleInactivation = (userId: string) =>
  request({
    url: `${AuthURL}/ToggleInactivationById/${userId}`,
    method: "Delete",
    data: null,
});
    

    const getUsers = () =>
      request({
        url: `${AuthURL}/GetUsers`,
        method: "GET",
        data: null,
      });


      const GetFollowingIds = () =>
        request({
          url: `${AuthURL}/GetFollowingIds`,
          method: "GET",
          data: null,
        });

        const GetUserByEmail = (Email : string) =>
          request({
            url: `${AuthURL}/userByEmail/${Email}`,
            method: "GET",
            data: null,
          });
  

        const GetUsersFollowing = (userId : string) =>
          request({
            url: `${AuthURL}/GetFollowing/${userId}`,
            method: "GET",
            data: null,
          });
          const GetUsersGroups = (userId : string) =>
            request({
              url: `${AuthURL}/GroupsByUser/${userId}`,
              method: "GET",
              data: null,
            });
    
      const follow = (id: string) =>
        request({
          url: `${AuthURL}/follow`,
          method: "PUT",
          data: {id},
        });

    
        const unfollow = (id: string) =>
          request({
            url: `${AuthURL}/unfollow`,
            method: "PUT",
            data: {id},
          });

          const block = (id: string) =>
            request({
              url: `${AuthURL}/block`,
              method: "PUT",
              data: {id},
            });

            const unBlock = (id: string) =>
              request({
                url: `${AuthURL}/unblock`,
                method: "PUT",
                data: {id},
              });

              const ResetPassword = (Email : string) =>
                request({
                  url: `${AuthURL}/ResetPassword/${Email}`,
                  method: "GET",
                  data: null,
                });
  
                const SetNewPassword = (ResetPasswordDTO : ReNewPasswordDTO) =>
                  request({
                    url: `${AuthURL}/SetNewPassword`,
                    method: "PUT",
                    data: ResetPasswordDTO,
                  });

              const manage = (AppUserEdit : IAppUserEdit) =>
                request({
                  url: `${AuthURL}/manage`,
                  method: "PUT",
                  data: AppUserEdit ,
                });
              



export { register, login, validate, getUser, follow, unfollow, block, unBlock,manage,GetUsersFollowing };

export const auth = {
  register,
  login,
  validate,
  getUser,
  getUsers,
  follow,
  unfollow,
  block,
  unBlock,
  manage,
  GetFollowingIds,
  GetUsersFollowing,
  GetUsersGroups,
  GetUserByEmail,
  ResetPassword,
  SetNewPassword,
  toggleInactivation
};
