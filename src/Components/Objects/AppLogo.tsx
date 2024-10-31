import { useContext } from "react";
import { ThemeContext } from "../../ContextAPI/ThemeContext";

const AppLogo: React.FC<{
  Size: string;
}> = ({ Size }) => {
  const { Theme } = useContext(ThemeContext);
  return (
    <>
      <img
        src={
          Theme == "dark"
            ? "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730390862/cqffmqc048rxhqdivxw0.png"
            : "https://res.cloudinary.com/dhle9hj3n/image/upload/v1730390841/zwg4zcifetwglgq8ih4c.png"
        }
        width={Size}
        height={Size}
      />
    </>
  );
};
export { AppLogo };
