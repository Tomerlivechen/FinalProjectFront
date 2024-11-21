import { useEffect, useState } from "react";
import { IPostDisplay } from "../../Models/Interaction";
import { sortByProperty } from "../../Constants/Patterns";
import PostView from "./PostView";
import { PostListValues } from "../../Types/@PostTypes";

const PostList: React.FC<{ postListValue: PostListValues }> = ({
  postListValue,
}) => {
  const [posts, setPosts] = useState<IPostDisplay[]>(postListValue.posts);
  const order = postListValue.orderBy;
  const sort = postListValue.sortElement as keyof IPostDisplay;
  const filterId = postListValue.filter;
  const [sortedPosts, setSortedPosts] = useState<IPostDisplay[]>(
    postListValue.posts
  );
  useEffect(() => {
    if (order && sort && !filterId) {
      const sorted = postListValue.posts
        .slice()
        .sort(sortByProperty(sort, order));
      setSortedPosts(sorted);
    }
    if (order && sort && filterId) {
      let multyFilter: IPostDisplay[] = [];
      if (Array.isArray(filterId)) {
        filterId.forEach((filter: number) => {
          const filteredPosts = posts.filter(
            (post) => post.categoryId === filter
          );
          multyFilter = multyFilter.concat(filteredPosts);
        });
      } else {
        multyFilter = posts.filter((post) => post.categoryId === filterId);
      }
      const sortedFilterd = multyFilter
        .slice()
        .sort(sortByProperty(sort, order));
      setSortedPosts(sortedFilterd);
    }
  }, [postListValue]);

  useEffect(() => {
    if (postListValue) {
      setPosts(postListValue.posts);
    }
  }, []);

  return (
    <>
      <div>
        {sortedPosts.map((post) => (
          <div className="p-2" key={post.id}>
            <PostView {...post} />
          </div>
        ))}
      </div>
    </>
  );
};

export { PostList };
