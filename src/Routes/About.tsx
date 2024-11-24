
import ElementFrame from "../Constructors/ElementFrame";
import { MotionFrame } from "../Components/Objects/MotionFrame";

function About() {
  return (
    <MotionFrame>
      <ElementFrame tailwind="p-6 max-w-5xl md:mx-auto sm:ml-7 md:justify-center md:ml-7 ml-7">
        <h1 className="text-3xl font-bold mb-4">About This Project</h1>
        <p className="mb-4">
          Welcome to Dr. Tomer Chen's final project for the .NET course at
          HackerU! This project required developing both the frontend and
          backend for a web app.
        </p>
        <p className="mb-4">
          The backend was built using ASP.NET API, and the frontend was created
          using React + TypeScript, styled with Tailwind (with minimal CSS
          adjustments). The app is hosted on Azure’s free hosting service, so it
          may be a touch slow at times.
        </p>{" "}
        <p className="mb-4">
          Here's what it offers as a dynamic social media platform:
        </p>
        <ul className=" mb-4">
          <li>
            <b>User Profiles</b>: Three user tiers: Admin, Power User, and User,
            each with different permissions.
          </li>
          <li>
            <b>Posts</b>: Users can post on their profiles and within groups.
          </li>
          <li>
            <b>Comments</b>: Add comments to posts and to other comments (with a
            limit on depth).
          </li>
          <li>
            <b>Social Groups</b>: Join groups tailored to specific interests.
          </li>
          <li>
            <b>Chat System</b>: Enjoy one-on-one conversations with other users.
          </li>
          <li>
            <b>External Image Storage</b>: Images are stored externally using
            Cloudinary.
          </li>
          <li>
            <b>Password Recovery</b>: A secure password recovery solution via
            the Identity framework and EmailJS.
          </li>
          <li>
            <b>Responsiveness</b>: The app is fully responsive and compatible
            with all screen sizes.
          </li>
        </ul>
        <p>
          Enjoy the experience!
          <br />
          Click on the <b>Help</b> button in the navigation bar for more details
          on usage
        </p>
        <p className="mb-4">
          

            If you find any bugs, please reach out via chat to the
            <b>SysAdmin</b> or by email at:
            <a
              href="mailto:TomerLiveChen@gmail.com"
              className="font-bold underline decoration-teal-500 decoration-4 inline"
            >
                TomerLiveChen@gmail.com.
            </a>

        </p>
      </ElementFrame>
    </MotionFrame>
  );
}

export default About;
