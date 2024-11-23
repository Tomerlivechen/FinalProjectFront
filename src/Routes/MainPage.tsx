import { MainPageComponent } from "../Components/Objects/MainPageComponent";
import { MotionFrame } from "../Components/Objects/MotionFrame";
import LoginPage from "./Login";

function MainPage() {
  return (
    <>
      <MotionFrame>
        <div className="flex flex-col md:flex-row h-screen">
          <div className="md:w-1/12 hidden md:block"></div>
          <div className="w-full md:w-2/5 flex items-center justify-center p-5 ">
            <MainPageComponent />
          </div>
          <div className="md:w-1/12 hidden md:block"></div>
          <div className="w-full md:w-2/5 flex items-center justify-center p-5 ">
            <LoginPage />
          </div>
        </div>
      </MotionFrame>
    </>
  );
}

export default MainPage;
