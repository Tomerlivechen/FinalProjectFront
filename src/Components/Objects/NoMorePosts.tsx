import { colors } from "../../Constants/Patterns"

const NoMorePosts =()=>{
return (<><div>
    <div  className={`rounded-md border-2 px-2 py-2  ${colors.ElementFrame} font-bold w-[25rem] justify-center text-center`}>
        No Posts
        <img src="https://res.cloudinary.com/dhle9hj3n/image/upload/v1730727060/rglcjqapx5a23f80vysf.jpg"></img>
        </div>
    </div></>)

}

export {NoMorePosts}