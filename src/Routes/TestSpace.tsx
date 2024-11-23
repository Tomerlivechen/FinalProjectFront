import GroupPage from "../Components/GroupPage";
import { MotionFrame } from "../Components/Objects/MotionFrame";
import { NotificationObject } from "../Components/Objects/NotificationObject";
import UserCard from "../Components/Objects/UserCard";
import UserTab from "../Components/Objects/UserTab";
import { PostFrame } from "../Components/PostFrame";
import { IAppUserDisplay } from "../Models/UserModels";
import DinoSpinner from "../Spinners/DinoSpinner";
import { INotificationDisplay } from "../Types/@NotificationTyoe";

const card: IAppUserDisplay = {
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
  lastActive: "2024-11-07 14:45",
  chatId: "",
  votedOn: [],
  online: true,
  isActive: false,
};

const note: INotificationDisplay = {
  id: "4cef77e2-1222-457b-9355-a5f718cada6c",
  type: "Comment",
  date: "2024-11-10-16-38",
  seen: true,
  hidden: false,
  referenceId: "a0864ef3-91c0-4186-8415-b3ba57a515cc",
  notifierId: "61aabbcf-b2e9-419a-8ec0-e9623cb0795a",
  notifiedId: "",
};

function TestSpace() {
  return (
    <>
      <MotionFrame>
        <div>Test Space Elemens</div>
        <div>---------------------------</div>
        <div className="flex flex-wrap">
          <div className="p-10"></div>
          <UserCard UserDisplay={card} />
          <div className="p-10"></div>
          <UserTab UserDisplay={card} />
          <DinoSpinner size={60} />
          <NotificationObject NotificationData={note} />
          <PostFrame />
          <GroupPage />
        </div>
        <div>---------------------------</div>
        <div>Test Space Elemens</div>
      </MotionFrame>
    </>
  );
}

export default TestSpace;
