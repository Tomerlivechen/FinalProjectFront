import { useNavigate } from "react-router-dom"
import { colors } from "../Constants/Patterns";

const NotFound = () =>{
const navigate = useNavigate();
const toFeed = () => {
    navigate("/feed");
}
const toLogin = () => {
    navigate("/login");
}
return (<>
<div>
<div className={`${colors.ActiveText} md:text-5xl text-2xl  font-bold flex justify-center animate-pulse `}>

        You Got Lost In the forest...

</div>
<div className="flex flex-wrap justify-center ">
    <img className="w-2/3"  src="https://res.cloudinary.com/dhle9hj3n/image/upload/v1730645901/pyvlixvy8h3ipi1y7trw.jpg"/>
</div>
<div className="flex flex-wrap justify-center gap-3">
<div className="flex w-full justify-center md:text-3xl text-1xl font-bold">
Come back
</div>
    
<button className={`${colors.Buttons} p-3 rounded-xl`} onClick={toFeed}>
        Feed
</button>
<button className={`${colors.Buttons} p-3 rounded-xl`} onClick={toLogin}>
        Login
</button>
</div>
</div>
</>)
}

export {NotFound}