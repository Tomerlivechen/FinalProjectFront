import { MainPageComponent } from "../Components/Objects/MainPageComponent";
import LoginPage from "./Login";

function MainPage() {
  return (<>
      <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/12 flex md:block hidden"></div>
      <div className="w-full md:w-2/5 flex flex-wrap items-center justify-center p-5 ">
        <MainPageComponent/>
      </div>
<div className="md:w-1/12 flex md:block hidden"></div>
      <div className="md:w-2/5 flex items-center justify-center max-w-[30rem] ">
      <LoginPage/>
      </div>
    </div>
  </>);
}

export default MainPage;
