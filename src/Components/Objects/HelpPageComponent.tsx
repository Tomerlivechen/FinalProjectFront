import { FaCircleUp, FaEye, FaKey } from "react-icons/fa6";
import { colors } from "../../Constants/Patterns";
import ElementFrame from "../../Constructors/ElementFrame";
import { IoSparkles } from "react-icons/io5";
import { GoCommentDiscussion } from "react-icons/go";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { MdExpand, MdOutlineContentCopy } from "react-icons/md";
import { HiLink } from "react-icons/hi2";
import { RxOpenInNewWindow } from "react-icons/rx";

const HelpPageComponent: React.FC = () =>{


    return (
    <ElementFrame tailwind="max-w-4xl mx-auto p-6 shadow-md rounded-md">
      <h1 className={`text-3xl font-bold mb-4 ${colors.NavText}`}>User Guide for Using Deinonychus Social Media Platform</h1>

      <section className="mb-6">
        <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>Registration and Login</h2>
        <ul className={`list-disc ml-6 mt-2 ${colors.ButtonFont}`}>
          <li>
            <strong className={`underline `}>Register as a new user:</strong> Choose between a <strong>Basic User</strong> or <strong>Power User</strong> account. Currently, only Power Users can create groups.
          </li>
          <li>
            <strong className={`underline `}>Login:</strong> After logging in, you'll be directed to your feed, which will be empty until you start following others.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>Navigation and Discovery</h2>
        <ul className={`list-disc ml-6 mt-2 ${colors.ButtonFont}`}>
          <li>
            <strong className={`underline `}>Search:</strong> Use the search option in the navigation bar to access the search page.
            <ul className="list-disc ml-6">
              <li>Find people by first name, last name, or username.</li>
              <li>Search for posts by title, author's username, or keywords.</li>
            </ul>
          </li>
          <li>
            <strong className={`underline `}>Visit Profiles:</strong> View other users' profiles to check out their posts. If you find them interesting:
            <ul className="list-disc ml-6">
              <li>Follow them: Their posts will appear on your feed.</li>
              <li>Contact them: Start a chat from their profile page.</li>
            </ul>
          </li>
          <li>
            <strong className={`underline `}>Chats:</strong>
            <ul className="list-disc ml-6">
              <li>Chats can also be initiated from the People Lane once you follow a user.</li>
              <li>All open chats will be saved in the People Lane, regardless of whether you follow the user.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>Interacting with Posts</h2>
        <ul className={`list-disc ml-6 mt-2 ${colors.ButtonFont}`}>
          <li>
            <strong className={`underline `}>Your Feed:</strong> Once you follow users, their posts will appear in your feed.
            <ul className="list-disc ml-6">
              <li>Engage: You can upvote, downvote, comment, or reply to comments on posts.</li>
              <li>Unfollow: Stop following a user via their profile page.</li>
            </ul>
          </li>
          <li>
            <strong className={`underline `}>Additional Post Interactions:</strong>
            <ul className="list-disc ml-6">
              <li><span className="flex items-center gap-2">Open Post Link: Click the Link button <HiLink size={22} /> on the post to access its added link.</span></li>
              <li>View Post Image: Click the Image to display the attached image larger.</li>
              <li><span className="flex items-center gap-2">Show Keywords: Click the Key button <FaKey size={22} /> to reveal the keywords associated with the post.</span></li>
            </ul>
          </li>
          <li>
            <strong className={`underline `}>Sorting and Filtering:</strong> Customize your feed using options at the top of the feed.
            <ul className="list-disc ml-6">
              <li><span className="flex items-center gap-2">Sort: By votes <FaCircleUp size={22} />, new posts <IoSparkles size={22}/>, or the number of comments <GoCommentDiscussion size={22}/>.</span></li>
              <li> <span className="flex items-center gap-2">Order: Ascending <FaAngleDoubleUp size={22} /> or descending <FaAngleDoubleDown size={22} /> .</span></li>
              <li>Filter: By categories. Open the categories list and select the ones you'd like to see.</li>
            </ul>
          </li>
          <li>
            <strong className={`underline `}>Sharing Posts:</strong> <span className="flex items-center gap-2"> Copy the link to a post using the "Copy Link" <MdOutlineContentCopy size={22} />button to share it with others.</span>
          </li>
          <li>
            <strong className={`underline `}>Text View:</strong><span className="flex items-center gap-2"> Expand the text window for posts with long content <MdExpand size={22} />.</span>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>Creating Posts</h2>
        <ul className={`list-disc ml-6 mt-2 ${colors.ButtonFont}`}>
          <li>
            <strong className={`underline `}>New Post:</strong>
            <ul className="list-disc ml-6">
              <li>Go to the New Post tab and click the "Create" button.</li>
              <li>Fill in the post details: title, text, category, and optional keywords, link, and image (up to 2MB).</li>
              <li>Click Submit to publish your post. It will appear on your feed and on the feeds of your followers.</li>
            </ul>
          </li>
          <li>
            <strong className={`underline `}>Editing and Deleting Posts:</strong>
            <ul className="list-disc ml-6">
              <li>Edit your post via the Edit button.</li>
              <li>Delete it entirely using the Delete button.</li>
            </ul>
          </li>
          <li>
            <strong className={`underline `}>Image Gallery:</strong> Images uploaded with your posts are saved in your private gallery by default. You can:
            <ul className="list-disc ml-6">
              <li><span className="flex items-center gap-2">Make them public.<FaEye size={22} /></span></li>
              <li>Add names for easier identification.</li>
              <li><span className="flex items-center gap-2">Open full size in a new window <RxOpenInNewWindow size={22} />.</span></li>
              <li><span className="flex items-center gap-2">Share a link <MdOutlineContentCopy size={22} />.</span></li>
              <li>Delete forever</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>Groups</h2>
        <ul className={`list-disc ml-6 mt-2 ${colors.ButtonFont}`}>
          <li>
            <strong className={`underline `}>Joining Groups:</strong> Users can join groups to engage with posts and images on specific interests. Only members who agree to the group rules and join the group can view its content.
          </li>
          <li>
            <strong className={`underline `}>Creating Groups:</strong> Only Power Users can create groups via the Groups tab.
          </li>
          <li>
            <strong className={`underline `}>Group Management:</strong> Group admins can:
            <ul className="list-disc ml-6">
              <li>Update the group name, description, and rules.</li>
              <li>Remove unwanted users via the Group Settings tab.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>Profile Customization</h2>
        <ul className={`list-disc ml-6 mt-2 ${colors.ButtonFont}`}>
          <li>
            <strong className={`underline `}>Profile Settings:</strong>
            <ul className="list-disc ml-6">
              <li>Change name, username, profile image, banner, and bio.</li>
              <li>Hide your email and name from other users.</li>
              <li>Block users you find unappealing or hide your profile from blocked users.</li>
            </ul>
          </li>
          <li>
            <strong className={`underline `}>Accessibility Options:</strong>
            <ul className="list-disc ml-6">
              <li>Toggle between dark and light modes using the light bulb icon in the navigation bar.</li>
              <li className={`underline `}>Use the Accessibility Tab to:
                <ul className="list-disc ml-6">
                  <li>Zoom in and out.</li>
                  <li>Change contrast settings.</li>
                  <li>Enable grayscale mode.</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className={`text-xl font-semibold ${colors.ActiveText} `}>Moderation and Community Guidelines</h2>
        <ul className={`list-disc ml-6 mt-2 ${colors.ButtonFont}`}>
          <li>
            <strong className={`underline `}>Content Monitoring:</strong> Offensive posts, comments, or groups will be removed by moderators.
          </li>
          <li>
            <strong className={`underline `}>User Behavior:</strong> If offensive behavior continues, users will be warned and may face bans after a discussion with a moderator.
          </li>
          <li>
            <strong className={`underline `}>Respect Others:</strong> Be respectful to maintain a welcoming environment for everyone.
          </li>
        </ul>
      </section>
    </ElementFrame>
  );
};

export {HelpPageComponent}
