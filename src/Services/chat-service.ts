import { request } from "../Utils/Axios-Interceptor";


export interface INewMessage {
    ChatId: string;
    message: string;
}

const ChatURL = "/Chat";


const sendMessage = (newMessage: INewMessage) =>
    request({
      url: `${ChatURL}/Message/`,
      method: "POST",
      data: newMessage,
  });

  const updateMessage = (newMessage: string, MessageId:string) =>
    request({
      url: `${ChatURL}/EditMessage/${MessageId}`,
      method: "PUT",
      data: {Input:newMessage},
  });

const getChat = (ChatID: string) =>
    request({
      url: `${ChatURL}/ByChatId/${ChatID}`,
      method: "GET",
      data: null,
  });

  const deleteMessage = (MessageId:string) =>
    request({
      url: `${ChatURL}/DeleteMessage/${MessageId}`,
      method: "DELETE",
      data: null,
  });

  const GetNotFollowingChats = () =>
    request({
      url: `${ChatURL}/notFollowingChats`,
      method: "GET",
      data: null,
  });

  const CreatChat = (userid: string) =>
    request({
      url: `${ChatURL}`,
      method: "POST",
      data: {id:userid},
  });

  export const Chat = {sendMessage, getChat, CreatChat, GetNotFollowingChats, updateMessage,deleteMessage}