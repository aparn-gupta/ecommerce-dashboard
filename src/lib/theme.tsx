import { createContext, useState } from "react";

export const themeContext = createContext("");

export default function themeComponent({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}
