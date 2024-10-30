import { useContext } from "react";
import { ThemeContext } from "../../ContextAPI/ThemeContext";

const AppLogo: React.FC<{
    Size: string;
  }> = ({ Size }) => {
    const { Theme,  } = useContext(ThemeContext);
    return(<>
    <img
    src={Theme == "dark" ? "/src/assets/dnmlogo.png" : "/src/assets/ddmlogo.png"}
                                width={Size}
                            height={Size}
    
    /></>)

}
export { AppLogo } 