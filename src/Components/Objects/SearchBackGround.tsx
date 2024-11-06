import { colors } from "../../Constants/Patterns";

const SearchBackGround = () => {
  return (
    <>
      <div>
        <div
          className={`rounded-md  px-2 py-2  ${colors.ActiveText} font-bold w-[25rem] justify-center text-center`}
        >
          <img
            className=" h-auto rounded-full opacity-40"
            src="https://res.cloudinary.com/dhle9hj3n/image/upload/v1730883134/pldctzrxia9bfm25r4oc.jpg"
          ></img>
        </div>
      </div>
    </>
  );
};

export { SearchBackGround };
