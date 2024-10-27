import { createContext, useEffect, useState } from "react";
import { ProviderProps } from "../Types/@StructureTypes";

const initialValues = {
  Theme: localStorage.getItem("preferedmode")?.toString() ?? "light",
  toggleTheme: () => {},
};

const ThemeContext = createContext(initialValues);

const ThemeProvider: React.FC<ProviderProps> = ({ children }) => {
  useEffect(() => {
    if (Theme === "dark") {
      document.body.classList.toggle(Theme);
    }
  }, []);
  const [Theme, setTheme] = useState(initialValues.Theme);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    document.body.classList.toggle("dark");
    const current = Theme === "dark" ? "light" : "dark";
    localStorage.setItem("preferedmode", current);
  }

  return (
    <ThemeContext.Provider value={{ Theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
