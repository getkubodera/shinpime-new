"use client";

import { createContext, useContext } from "react";

// Define the ThemeContext
const ThemeContext = createContext<"light" | "dark">("dark");

// ThemeProvider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeContext.Provider value="dark">
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook for accessing the theme context
export const useTheme = () => useContext(ThemeContext);
