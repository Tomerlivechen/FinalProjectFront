
import { INewPost, IPostDisplay } from "../Models/Interaction";
import { request } from "../Utils/Axios-Interceptor";

const postURL = "/posts";


const getPosts = () =>
  request({
    url: `${postURL}`,
    method: "GET",
    data: null,
  });

  const getPostById = (Id: string) =>
    request({
      url: `${postURL}/ById/${Id}`,
      method: "GET",
      data: null,
    });

  const postPost = (Post: INewPost) =>
    request({
      url: `${postURL}`,
      method: "POST",
      data: Post,
    });

    const DeletePost = (Id: string) =>
      request({
        url: `${postURL}/${Id}`,
        method: "Delete",
        data: null,
      });

      const unvotePost = (PostId: string) =>
        request({
          url: `${postURL}/UnVoteById/${PostId}`,
          method: "Put",
          data: null,
        });

        const GetVotedOn = () =>
          request({
            url: `${postURL}/ByVotedOn`,
            method: "GET",
            data: null,
          });

    const VoteOnPost = (Id: string, vote: number) =>
      request({
        url: `${postURL}/VoteById/${Id}`,
        method: "PUT",
        data: {Vote:vote},
      });
  
      const EditPost = ( post: IPostDisplay) =>
        request({
          url: `${postURL}/${post.id}`,
          method: "PUT",
          data: post,
        });

        const GetAuthorPosts = ( userId: string) =>
          request({
            url: `${postURL}/ByAuthor/${userId}`,
            method: "Get",
            data: null,
          });
          
          const GetGroupPosts = ( GroupId: string) =>
            request({
              url: `${postURL}/ByGroup/${GroupId}`,
              method: "Get",
              data: null,
            });


export { getPosts, postPost, VoteOnPost , EditPost,DeletePost };

export const Posts = { getPosts, postPost, VoteOnPost , EditPost, DeletePost,GetAuthorPosts,GetGroupPosts,getPostById,unvotePost,GetVotedOn };
