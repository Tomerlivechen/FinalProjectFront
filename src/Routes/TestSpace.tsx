import { ImageList } from "../Components/Objects/ImageList";
import { ImageObject } from "../Components/Objects/ImageObject";
import { IAppImage } from "../Types/@ImageTypes";
import Profile from "./Profile";



const images: IAppImage[] = [{
  id: "56245623456t45",
  userId: "",
  url:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730138545/pondezm6ey0avk7mqeay.jpg",
  datetime: "",
  title: "picture",
  Public: true,
},{
  id: "5624562356t45",
  userId: "",
  url:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730138545/pondezm6ey0avk7mqeay.jpg",
  datetime: "",
  title: "picture",
  Public: true,
},{
  id: "56245623456t5",
  userId: "",
  url:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730138545/pondezm6ey0avk7mqeay.jpg",
  datetime: "",
  title: "picture",
  Public: true,
},{
  id: "5624623456t45",
  userId: "",
  url:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730138545/pondezm6ey0avk7mqeay.jpg",
  datetime: "",
  title: "picture",
  Public: true,
},{
  id: "5245623456t45",
  userId: "",
  url:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730138545/pondezm6ey0avk7mqeay.jpg",
  datetime: "",
  title: "picture",
  Public: true,
},{
  id: "562456456t45",
  userId: "",
  url:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730138545/pondezm6ey0avk7mqeay.jpg",
  datetime: "",
  title: "picture",
  Public: true,
},{
  id: "56245623456t4",
  userId: "",
  url:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730138545/pondezm6ey0avk7mqeay.jpg",
  datetime: "",
  title: "picture",
  Public: true,
},{
  id: "6245623456t45",
  userId: "",
  url:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730138545/pondezm6ey0avk7mqeay.jpg",
  datetime: "",
  title: "picture",
  Public: true,
},{
  id: "562456234y56t45",
  userId: "",
  url:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730138545/pondezm6ey0avk7mqeay.jpg",
  datetime: "",
  title: "picture",
  Public: true,
},{
  id: "56247623456t45",
  userId: "",
  url:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730138545/pondezm6ey0avk7mqeay.jpg",
  datetime: "",
  title: "picture",
  Public: true,
},{
  id: "5624562345ut45",
  userId: "",
  url:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730138545/pondezm6ey0avk7mqeay.jpg",
  datetime: "",
  title: "picture",
  Public: true,
},{
  id: "562tr623456t45",
  userId: "",
  url:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730138545/pondezm6ey0avk7mqeay.jpg",
  datetime: "",
  title: "picture",
  Public: true,
},
]


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
      
        <Profile/>
      </div>
      <div>---------------------------</div>
      <div>Test Space Elemens</div>
    </>
  );
}

export default TestSpace;
