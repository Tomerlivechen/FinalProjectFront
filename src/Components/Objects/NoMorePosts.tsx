import { colors } from "../../Constants/Patterns";

const NoMorePosts = () => {
  // presents an image if user has no posts on their feed
  return (
    <>
      <div>
        <div
          className={`rounded-md  px-2 py-2  ${colors.ActiveText} font-bold md:w-[25rem] w-[22rem] justify-center text-center`}
        >
          No Posts
          <img
            className=" h-auto rounded-full opacity-40"
            src="https://res.cloudinary.com/dhle9hj3n/image/upload/v1730727060/rglcjqapx5a23f80vysf.jpg"
          ></img>
        </div>
      </div>
    </>
  );
};

export { NoMorePosts };
