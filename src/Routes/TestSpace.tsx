import { ImageObject } from "../Components/Objects/ImageObject";
import { IAppImage } from "../Types/@ImageTypes";

function TestSpace() {
  const image: IAppImage = {
    id: "56245623456t45",
    userId: "",
    url:
      "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730138545/pondezm6ey0avk7mqeay.jpg",
    datetime: "",
    title: "picture",
    Public: true,
  };

  return (
    <>
      <div>Test Space Elemens</div>
      <div>---------------------------</div>
      <div className="flex">
        <div className="w-28"></div>
        <ImageObject ImageObjectProps={image} />
      </div>
      <div>---------------------------</div>
      <div>Test Space Elemens</div>
    </>
  );
}

export default TestSpace;
