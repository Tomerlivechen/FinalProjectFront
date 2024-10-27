interface INewComment {
  id: string;
  link: string | null;
  imageURL: string | null;
  text: string | null;
  authorId: string;
  ParentPostId: string;
  ParentCommentId: string;
  Datetime: string;
}

export type { INewComment };
