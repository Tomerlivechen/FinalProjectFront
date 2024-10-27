import { dialogs } from "../Constants/AlertsConstant";

const useCopy = () => {
  return async (postId: string) => {
    const basePath = window.location.origin;
    const postLink = `${basePath}/feed/${postId}`;
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
