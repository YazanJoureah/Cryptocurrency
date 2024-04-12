import { createContext, useEffect, useState } from "react";

export const Window = createContext(null);
export default function WindowContext({ children }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    function WindowWidth() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", WindowWidth);

    //clean up listener
    return () => {
      window.removeEventListener("resize", WindowWidth);
    };
  }, []);
  return (
    <Window.Provider value={{ windowSize, setWindowSize }}>
      {children}
    </Window.Provider>
  );
}
