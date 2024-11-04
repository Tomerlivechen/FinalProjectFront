
import UserCard from "../Components/Objects/UserCard";
import { IAppUserDisplay } from "../Models/UserModels";

const card : IAppUserDisplay= {
  id: "",
  prefix: "rrrrr",
  first_Name: "rfffffffffrrrr",
  last_Name: "rrrrfffffffffrrrrrr",
  userName: "rrrffffffffffffrrrr",
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

      </div>
      <div>---------------------------</div>
      <div>Test Space Elemens</div>
    </>
  );
}

export default TestSpace;
