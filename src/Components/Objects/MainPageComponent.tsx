import { AppLogo } from "./AppLogo"

const MainPageComponent = () => {


    return (
        <>
       

<div className="flex flex-col items-center p-5 justify-start md:min-h-screen">
        <AppLogo Size="150"/>
    <div className="p-5 text-4xl">
    Deinonychus
    <p className="ml-10"> Connecting dinosaurs, spring chickens, and everyone in between.</p>
    </div>
    </div>
    </>)
}
export {MainPageComponent}