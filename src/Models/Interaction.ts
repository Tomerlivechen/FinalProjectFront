import { ISocialGroup } from "./SocialGroup";
import { IAppUserDisplay } from "./UserModels";

interface IInteraction {
  id: string;
  link: string;
  imageUrl: string;
  text: string;
  author: IAppUserDisplay;
  votes?: Vote[] 
  upVotes: number;
  downVotes: number;
  totalVotes: number;
  datetime: string;
  comments?: IComment[];
  calcVotes: () => void;
}

interface Vote {
  id: string;
  voter: IAppUserDisplay;
  voted: number;
}

interface IPost extends IInteraction {
  title: string;
  category?: ICategory;
  group?: ISocialGroup;
  keyWords?: string[] ;
}

interface INewPost {
  id: string;
  title: string;
  link: string;
  imageURL: string;
  text: string;
  authorId: string;
  categoryId?: number;
  group: string;
  keyWords: string;
  datetime: string;
}

interface IPostDisplay {
  id: string;
  link: string;
  imageURL: string;
  text: string;
  authorName: string;
  authorId: string;
  totalVotes: number;
  groupId : string;
  title: string;
  hasVoted: boolean;
  categoryId?: number;
  keyWords: string[];
  datetime: string;
  comments?: ICommentDisplay[] | null;
}

interface ICommentDisplay {
  id: string;
  link: string;
  imageURL: string;
  text: string;
  authorName: string;
  authorId: string;
  totalVotes: number;
  parentPostId: string;
  parentCommentId: string;
  hasVoted: boolean;
  datetime: string;
  comments?: ICommentDisplay[] | null;
}

interface IComment extends IInteraction {
  parentPost?: IPost;
  parentComment?: IComment;
}

interface ICategory {
  id: number;
  name: string;
}

export type {
  IInteraction,
  Vote,
  IPost,
  IComment,
  ICategory,
  ICommentDisplay,
  IPostDisplay,
  INewPost,
};
