 interface IMessage {
  id: string;
  chatId: string;
  userId: string;
  userName: string;
  message: string;
  datetime: string;
  editable : boolean;
}

 interface IChat {
  id: string;
  user1Id: string;
  user1Name: string;
  user2Id: string;
  user2Name: string;
  messages: IMessage[];
}

export type { IMessage, IChat };
