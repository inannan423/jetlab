"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
        <div className="flex">
          <div className="w-8 h-8 rounded-md" />
          <div className="w-8 h-8 rounded-md" />
          <div className="w-8 h-8 rounded-md" />
        </div>
      </div>
    );
  }

  const themes = [
    {
      key: "light",
      icon: <Sun className="h-4 w-4" />,
      label: "浅色",
    },
    {
      key: "system", 
      icon: <Monitor className="h-4 w-4" />,
      label: "系统",
    },
    {
      key: "dark",
      icon: <Moon className="h-4 w-4" />,
      label: "深色",
    },
  ];

  return (
    <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
      {themes.map((themeOption) => (
        <button
          key={themeOption.key}
          onClick={() => setTheme(themeOption.key)}
          className={`
            flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200
            ${
              theme === themeOption.key
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }
          `}
          title={themeOption.label}
          aria-label={`切换到${themeOption.label}模式`}
        >
          {themeOption.icon}
        </button>
      ))}
    </div>
  );
}
