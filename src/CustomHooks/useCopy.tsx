import { dialogs } from "../Constants/AlertsConstant";
// hook made to post link to clipboard
const useCopy = () => {
  return async (postId: string) => {
    const basePath = window.location.origin;
    const postLink = `${basePath}/feed?postId=${postId}`;
    try {
      await navigator.clipboard.writeText(postLink);
      dialogs.success("link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      dialogs.error("Failed to copy to clipboard!");
    }
  };
};

export { useCopy };
