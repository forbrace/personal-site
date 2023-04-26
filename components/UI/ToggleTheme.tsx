import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ToggleTheme: React.FC<{ className: string }> = (props) => {
  const { systemTheme, theme, setTheme } = useTheme();

  function toggleTheme() {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setTheme(currentTheme == "dark" ? "light" : "dark");
  }

  return (
    <label
      htmlFor="theme"
      className={`${props.className} flex justify-between items-center w-12 h-6 rounded-2xl px-2 relative label bg-black dark:bg-white cursor-pointer text-white dark:text-black`}
      tabIndex={0}
      onClick={toggleTheme}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.key === " " && event.preventDefault();
          toggleTheme();
        }
      }}
    >
      <SunIcon className="w-3 h-3" />
      <MoonIcon className="w-3 h-3" />
      <span
        className={`w-4 h-4 absolute bg-white dark:bg-black left-1 dark:left-auto dark:right-1 top-1 transition-all rounded-full`}
      />
    </label>
  );
};

export default ToggleTheme;
