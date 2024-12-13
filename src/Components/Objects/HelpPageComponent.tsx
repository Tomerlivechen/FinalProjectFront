import { FaCircleUp, FaComments, FaEye, FaKey } from "react-icons/fa6";
import { colors } from "../../Constants/Patterns";
import ElementFrame from "../../Constructors/ElementFrame";
import { IoImage, IoSparkles } from "react-icons/io5";
import { GoCommentDiscussion } from "react-icons/go";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { MdExpand, MdOutlineContentCopy } from "react-icons/md";
import { HiLink } from "react-icons/hi2";
import { RxOpenInNewWindow } from "react-icons/rx";
import { GiHummingbird } from "react-icons/gi";
import { BsEgg } from "react-icons/bs";

const HelpPageComponent: React.FC = () => {
  return (
    <>
      <ElementFrame tailwind="max-w-4xl mx-auto p-6 shadow-md rounded-md">
        <h1 className={`text-3xl font-bold mb-4 ${colors.NavText}`}>
          User Guide for Using Deinonychus Social Media Platform
        </h1>

        <section className="mb-6">
          <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>
            Registration and Login
          </h2>
          <ul className={`list-disc mt-2 ${colors.ButtonFont}`}>
            <strong className={`underline `}>Register as a new user:</strong>{" "}
            Choose between a <strong>Basic User</strong> or{" "}
            <strong>Power User</strong> account. Currently, only Power Users can
            create groups.
            <div>
              <strong className={`underline `}>Login:</strong> After logging in,
              you'll be directed to your feed, which will be empty until you
              start following others.
            </div>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>
            Navigation and Discovery
          </h2>
          <ul className={`list-disc  mt-2 ${colors.ButtonFont}`}>
            <strong className={`underline `}>Search:</strong> Use the search
            option in the navigation bar to access the search page.
            <ul className="list-disc ml-6">
              <li>Find people by first name, last name, or username.</li>
              <li>
                Search for posts by title, author's username, or keywords.
              </li>
            </ul>
            <strong className={`underline `}>Visit Profiles:</strong> View other
            users' profiles to check out their posts. If you find them
            interesting:
            <ul className="list-disc ml-6">
              <li>Follow them: Their posts will appear on your feed.</li>
              <li>Contact them: Start a chat from their profile page.</li>
            </ul>
            <strong className={`underline `}>Chats:</strong>
            <ul className="list-disc ml-6">
              <li>
                Chats can also be initiated from the People Lane once you follow
                a user.
              </li>
              <li>
                All open chats will be saved in the People Lane, regardless of
                whether you follow the user.
              </li>
            </ul>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>
            Interacting with Posts
          </h2>
          <ul className={`list-disc  mt-2 ${colors.ButtonFont}`}>
            <strong className={`underline `}>Your Feed:</strong> Once you follow
            users, their posts will appear in your feed.
            <ul className="list-disc ml-6">
              <li>
                Engage: You can upvote, downvote, comment, or reply to comments
                on posts.
              </li>
              <li>Unfollow: Stop following a user via their profile page.</li>
            </ul>
            <strong className={`underline `}>
              Additional Post Interactions:
            </strong>
            <ul className="list-disc ml-6">
              <li>
                <span className="flex items-center gap-2 flex-wrap">
                  Open Post Link: Click the Link button <HiLink size={22} /> on
                  the post to access its added link.
                </span>
              </li>
              <li>
                View Post Image: Click the Image to display the attached image
                larger.
              </li>
              <li>
                <span className="flex items-center gap-2 flex-wrap">
                  Show Keywords: Click the Key button <FaKey size={22} /> to
                  reveal the keywords associated with the post.
                </span>
              </li>
            </ul>
            <strong className={`underline `}>Sorting and Filtering:</strong>{" "}
            Customize your feed using options at the top of the feed.
            <ul className="list-disc ml-6">
              <li>
                <span className="flex items-center gap-2 flex-wrap">
                  Sort: By votes <FaCircleUp size={22} />, new posts{" "}
                  <IoSparkles size={22} />, or the number of comments{" "}
                  <GoCommentDiscussion size={22} />.
                </span>
              </li>
              <li>
                <span className="flex items-center gap-2 flex-wrap">
                  Order: Ascending <FaAngleDoubleUp size={22} /> or descending{" "}
                  <FaAngleDoubleDown size={22} /> .
                </span>
              </li>
              <li>
                Filter: By categories. Open the categories list and select the
                ones you'd like to see.
              </li>
            </ul>
            <span className="flex items-center gap-2 flex-wrap">
              <strong className={`underline `}>Sharing Posts:</strong>
              Copy the link to a post using the "Copy Link"
              <MdOutlineContentCopy size={22} />
              button to share it with others.
            </span>
            <span className="flex items-center gap-2 flex-wrap">
              <strong className={`underline `}>Text View:</strong>
              Expand the text window for posts with long content
              <MdExpand size={22} />.
            </span>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>
            Creating Posts
          </h2>
          <ul className={`list-disc  mt-2 ${colors.ButtonFont}`}>
            <strong className={`underline `}>New Post:</strong>
            <ul className="list-disc ml-6">
              <li>Go to the New Post tab and click the "Create" button.</li>
              <li>
                Fill in the post details: title, text, category, and optional
                keywords, link, and image (up to 2MB).
              </li>
              <li>
                NSFW and Explicit posts should be categorized accordingly. NSFW
                will censor the image when not selected, while Explicit will
                censor both the image and text unless selected.
              </li>
              <li>
                Click Submit to publish your post. It will appear on your feed
                and on the feeds of your followers.
              </li>
            </ul>
            <strong className={`underline `}>
              Editing and Deleting Posts:
            </strong>
            <ul className="list-disc ml-6">
              <li>Edit your post via the Edit button.</li>
              <li>Delete it entirely using the Delete button.</li>
            </ul>
            <strong className={`underline `}>Image Gallery:</strong> Images
            uploaded with your posts are saved in your private gallery by
            default. You can:
            <ul className="list-disc ml-6">
              <li>
                <span className="flex items-center gap-2 flex-wrap">
                  Make them public.
                  <FaEye size={22} />
                </span>
              </li>
              <li>Add names for easier identification.</li>
              <li>
                <span className="flex items-center gap-2 flex-wrap">
                  Open full size in a new window <RxOpenInNewWindow size={22} />
                  .
                </span>
              </li>
              <li>
                <span className="flex items-center gap-2 flex-wrap">
                  Share a link <MdOutlineContentCopy size={22} />.
                </span>
              </li>
              <li>Delete forever</li>
            </ul>
          </ul>
        </section>
        <section className="mb-6">
          <h1 className={`text-xl font-semibold ${colors.ActiveText} `}>
            Managing Comments
          </h1>
          <p className={`list-disc  mt-2 ${colors.ButtonFont}`}>
            To interact with comments effectively, follow these steps:
          </p>
          <strong className="underline">Opening Comments:</strong>
          <ul className="list-disc ml-6">
            <li className="mb-2">
              <span className="flex gap-2 flex-wrap">
                Click the Comment <FaComments size={22} /> button to view the
                comments section. Comments load
                <strong>five at a time</strong> by default. To see more
                comments, click the <strong>More</strong> button.
              </span>
            </li>
          </ul>
          <strong className="underline">Controls for Comments:</strong>

          <ul className="list-disc ml-6">
            <li>
              The controls for managing comments are similar to those for posts,
              with one key difference:
            </li>
            <li>
              Unlike posts, images within comments do not display automatically.
            </li>
            <li>
              <span className="flex items-center gap-2 flex-wrap">
                To view an image in a comment, click the Image button
                <IoImage size={22} />.
              </span>
            </li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>
            Groups
          </h2>
          <ul className={`list-disc  mt-2 ${colors.ButtonFont}`}>
            <strong className={`underline  `}>Joining Groups:</strong> Users can
            join groups to engage with posts and images on specific interests.
            Only members who agree to the group rules and join the group can
            view its content.
            <ul>
              <strong className={`underline  `}>Creating Groups:</strong> Only
              Power Users can create groups via the Groups tab.
            </ul>
            <strong className={`underline `}>Group Management:</strong> Group
            admins can:
            <ul className="list-disc ml-6">
              <li>Update the group name, description, and rules.</li>
              <li>Remove unwanted users via the Group Settings tab.</li>
            </ul>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>
            Profile Customization
          </h2>

          <strong className={`underline `}>Profile Settings:</strong>
          <ul className={`list-disc ml-6  ${colors.ButtonFont}`}>
            <li>Change name, username, profile image, banner, and bio.</li>
            <li>Hide your email and name from other users.</li>
            <li>
              Block users you find unappealing or hide your profile from blocked
              users.
            </li>
          </ul>

          <strong className={`underline `}>Accessibility Options:</strong>
          <ul className="list-disc ml-6">
            <li>
              Toggle between dark and light modes using the light bulb icon in
              the navigation bar.
            </li>
            <li className={`underline `}>
              Use the Accessibility Tab to:
              <ul className="list-disc ml-6">
                <li>Zoom in and out.</li>
                <li>Change contrast settings.</li>
                <li>Enable grayscale mode.</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="">
          <h1 className={`text-xl font-semibold mb-4 ${colors.ActiveText}`}>
            Notifications
          </h1>

          <p className="">
            The <strong>Notifications</strong> feature helps you stay updated on
            important interactions and messages.
          </p>

          <h2 className={`font-bold  underline ${colors.ButtonFont}`}>
            Where to Find Notifications:
          </h2>
          <ul className="list-disc ml-6 mb-4">
            <li>
              The notification icon is located on the{" "}
              <strong>right side of the navigation bar</strong>.
              <ul className="list-disc ml-6">
                <li>
                  <span className="flex items-center gap-2 flex-wrap">
                    If there are no notifications, the icon will display an
                    <strong>egg</strong> <BsEgg size={22} /> .
                  </span>
                </li>
                <li>
                  <span className="flex items-center gap-2 flex-wrap">
                    If you have new notifications, the icon will change to a
                    <strong>hummingbird</strong> <GiHummingbird size={26} /> .
                  </span>
                </li>
              </ul>
            </li>
          </ul>

          <h2 className={`font-bold mt-2 underline ${colors.ButtonFont}`}>
            When You Receive Notifications:
          </h2>
          <ul className="mb-2">
            You will be notified in the following situations:
          </ul>
          <ul className="list-disc ml-6 mb-4">
            <li>
              <strong>Comments:</strong> When someone comments on one of your
              posts.
            </li>
            <li>
              <strong>Chat Messages:</strong> When you receive a message in a
              chat while you are offline.
            </li>
          </ul>

          <h2 className={`font-bold mt-2 underline ${colors.ButtonFont}`}>
            How to Use Notifications:
          </h2>
          <p className="mb-2">
            Clicking on the notification icon will display a dropdown menu.
          </p>
          <ul className="list-disc ml-6">
            <li>View the latest comments on your posts.</li>
            <li>Open unread chat windows.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>
            Moderation and Community Guidelines
          </h2>
          <ul className={`list-disc ml-6 mt-2 ${colors.ButtonFont}`}>
            <li>
              <strong className={`underline `}>Content Monitoring:</strong>{" "}
              Offensive posts, comments, or groups will be removed by
              moderators.
            </li>
            <li>
              <strong className={`underline `}>User Behavior:</strong> If
              offensive behavior continues, users will be warned and may face
              bans after a discussion with a moderator.
            </li>
            <li>
              <strong className={`underline `}>Respect Others:</strong> Be
              respectful to maintain a welcoming environment for everyone.
            </li>
          </ul>
        </section>
      </ElementFrame>
    </>
  );
};

export { HelpPageComponent };
