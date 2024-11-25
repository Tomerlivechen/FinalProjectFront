import { MainPageComponent } from "../Components/Objects/MainPageComponent";
import { MotionFrame } from "../Components/Objects/MotionFrame";
import LoginPage from "./Login";

function MainPage() {
  return (
    <>
      <MotionFrame>
        <div className="flex flex-col md:flex-row h-screen justify-center">
          <section className="w-full md:w-2/5 flex items-center justify-center p-5 ">
            <MainPageComponent />
          </section>

          <section className="w-full md:w-2/5 flex items-center justify-center p-5 ">
            <LoginPage />
          </section>
        </div>
      </MotionFrame>
    </>
  );
}

export default MainPage;
