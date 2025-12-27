import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // Load theme from localStorage on initial render
        return localStorage.getItem('theme') || 'light';
    });

    // Save theme to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Apply theme to document body
    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);

        // Optional: Add specific styles for dark mode if using Tailwind dark mode
        if (theme === 'dark') {
            document.documentElement.style.setProperty('--bg-primary', '#111827');
            document.documentElement.style.setProperty('--text-primary', '#F9FAFB');
        } else {
            document.documentElement.style.setProperty('--bg-primary', '#F9FAFB');
            document.documentElement.style.setProperty('--text-primary', '#111827');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
