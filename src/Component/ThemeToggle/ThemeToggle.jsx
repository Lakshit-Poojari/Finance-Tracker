import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import "../ThemeToggle/ThemeToggle.css"

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div 
      className={`toggle-container ${theme === "dark" ? "dark" : ""}`} 
      onClick={toggleTheme}
    >
      <span className="slider"></span>
    </div>
  );
}

export default ThemeToggle;