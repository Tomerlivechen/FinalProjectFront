# Deinonychus Social Media Platform User Guide

## Table of Contents

- [Cloning] (#cloning)
- [Installation](#installation)
- [Using the Hosted Website](#using-the-hosted-website)
- [Registration and Login](#registration-and-login)
- [Navigation and Discovery](#navigation-and-discovery)
- [Interacting with Posts](#interacting-with-posts)
- [Creating Posts](#creating-posts)
- [Groups](#groups)
- [Profile Customization](#profile-customization)
- [Notifications](#notifications)
- [Moderation and Community Guidelines](#moderation-and-community-guidelines)

## Cloning

### Disclaimer

Cloning this repository for purposes outside of HackerU examination reasons is not recommended. Access to the database will be restricted. This is only the frontend of the web application.  


## Installation

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm (Node Package Manager) should be installed on your machine. You can download and install them from [https://nodejs.org/](https://nodejs.org/).

### Installing

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies.

### Dependencies

This project uses the following libraries and frameworks:


- [React](https://reactjs.org/)  
- [Vite](https://vitejs.dev/)  
- [Vite React Plugin](https://www.npmjs.com/package/@vitejs/plugin-react)  
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Tailwind CSS](https://tailwindcss.com/)    
- [Bootstrap](https://getbootstrap.com/)  
- [Bootstrap Icons](https://icons.getbootstrap.com/)  
- [axios](https://axios-http.com/)  
- [Cloudinary React](https://www.npmjs.com/package/@cloudinary/react)  
- [Cloudinary URL Gen](https://www.npmjs.com/package/@cloudinary/url-gen)  
- [React Router DOM](https://reactrouter.com/)  
- [JWT Decode](https://www.npmjs.com/package/jwt-decode)  
- [React Icons](https://react-icons.github.io/react-icons/)  
- [Formik](https://formik.org/)  
- [Framer Motion](https://www.framer.com/motion/)  
- [Lodash](https://lodash.com/)  
- [React Spinners](https://www.npmjs.com/package/react-spinners)  
- [SASS](https://sass-lang.com/)  
- [SweetAlert2](https://sweetalert2.github.io/)  
- [Yup](https://github.com/jquense/yup)  
- [Base64-URL](https://www.npmjs.com/package/base64-url)  
- [Base64URL](https://www.npmjs.com/package/base64url)  
- [Buffer](https://nodejs.org/api/buffer.html)  
- [EmailJS](https://www.emailjs.com/)  
- [Events](https://nodejs.org/api/events.html)  
- [Stream Browserify](https://github.com/browserify/stream-browserify)  
- [URL Encode](https://www.npmjs.com/package/urlencode)  
- [Util](https://nodejs.org/api/util.html)  

### `npm install`

Start the development server.

### `npm run dev`

The app will now be running on [http://localhost:5173](http://localhost:5173).


### Using the Hosted Website

The website is hosted on Render. You can access it using the following link: [Deinonychus](https://finalprojectfront-6dxw.onrender.com)

---

## Registration and Login
- **Register as a new user**: Choose between a Basic User or Power User account. Currently, only Power Users can create groups.
- **Login**: After logging in, you'll be directed to your feed, which will be empty until you start following others.

---

## Navigation and Discovery
- **Search**: Use the search option in the navigation bar to access the search page.
  - Find people by first name, last name, or username.
  - Search for posts by title, author's username, or keywords.
- **Visit Profiles**:
  - View other users' profiles to check out their posts.
  - **Follow them**: Their posts will appear on your feed.
  - **Contact them**: Start a chat from their profile page.
- **Chats**:
  - Chats can also be initiated from the People Lane once you follow a user.
  - All open chats will be saved in the People Lane, regardless of whether you follow the user.

---

## Interacting with Posts

### Your Feed
- Once you follow users, their posts will appear in your feed.
- Engage by upvoting, downvoting, commenting, or replying to comments on posts.
- Unfollow users via their profile page.

### Additional Post Interactions
- **Open Post Link**: Click the *Link* button on the post to access its added link.
- **View Post Image**: Click the image to display it larger.
- **Show Keywords**: Click the *Key* button to reveal associated keywords.

### Sorting and Filtering
- Customize your feed using options at the top of the feed:
  - **Sort**: By votes, new posts, or the number of comments.
  - **Order**: Ascending or descending.
  - **Filter**: By categories. Open the categories list and select the ones you'd like to see.

### Sharing Posts
- Copy the link to a post using the "Copy Link" button to share it with others.

### Text View
- Expand the text window for posts with long content.

---

## Creating Posts

### New Post
- Go to the *New Post* tab and click the "Create" button.
- Fill in the post details: title, text, category, and optional keywords, link, and image (up to 2MB).
- Click *Submit* to publish your post. It will appear on your feed and on the feeds of your followers.

### Editing and Deleting Posts
- Edit your post via the *Edit* button.
- Delete it entirely using the *Delete* button.

### Image Gallery
- Images uploaded with your posts are saved in your private gallery by default.
  - Make them public.
  - Add names for easier identification.
  - Open full size in a new window.
  - Share a link.
  - Delete forever.


## Groups

### Joining Groups
- Users can join groups to engage with posts and images on specific interests. Only members who agree to the group rules and join the group can view its content.

### Creating Groups
- Only Power Users can create groups via the *Groups* tab.

### Group Management
- Group admins can:
  - Update the group name, description, and rules.
  - Remove unwanted users via the *Group Settings* tab.



## Profile Customization

### Profile Settings
- Change name, username, profile image, banner, and bio.
- Hide your email and name from other users.
- Block users or hide your profile from blocked users.

### Accessibility Options
- Toggle between dark and light modes using the light bulb icon in the navigation bar.
- Use the Accessibility Tab to:
  - Zoom in and out.
  - Change contrast settings.
  - Enable grayscale mode.



## Notifications

### Where to Find Notifications
- The notification icon is located on the right side of the navigation bar.
  - If there are no notifications, the icon will display an **egg**.
  - If you have new notifications, the icon will change to a **hummingbird**.

### When You Receive Notifications
- You will be notified in the following situations:
  - **Comments**: When someone comments on one of your posts.
  - **Chat Messages**: When you receive a message in a chat while offline.

### How to Use Notifications
- Clicking on the notification icon will display a dropdown menu.
  - View the latest comments on your posts.
  - Open unread chat windows.



## Moderation and Community Guidelines
- **Content Monitoring**: Offensive posts, comments, or groups will be removed by moderators.
- **User Behavior**: If offensive behavior continues, users will be warned and may face bans after a discussion with a moderator.
- **Respect Others**: Be respectful to maintain a welcoming environment for everyone.
