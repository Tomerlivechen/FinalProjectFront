
import UserCard from "../Components/Objects/UserCard";
import UserTab from "../Components/Objects/UserTab";
import { IAppUserDisplay } from "../Models/UserModels";

const card : IAppUserDisplay= {
  id: "",
  prefix: "rrrrr",
  first_Name: "rfffffffffrrrr",
  last_Name: "rrrrfffffffffrrrrrr",
  userName: "rrrffffffffgggggggggggffffrrrr",
  email: "",
  imageURL: "",
  following: false,
  blocked: false,
  blockedYou: false,
  pronouns: "he har",
  bio: "",
  banerImageURL: "",
  hideEmail: false,
  hideName: false,
  hideBlocked: false,
  lastActive: "",
  chatId: "",
  votedOn: []
}


function TestSpace() {
  return (
    <>
      <div>Test Space Elemens</div>
      <div>---------------------------</div>
      <div className="flex flex-wrap">
        <div className="p-10"></div>
<UserCard UserDisplay={card}/>
<div className="p-10"></div>
<UserTab UserDisplay={card}/> 

      </div>
      <div>---------------------------</div>
      <div>Test Space Elemens</div>
    </>
  );
}

export default TestSpace;
