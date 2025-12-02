import { createContext, useContext, useState, useEffect } from 'react';
import { getSettings } from '../api/authService';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Load theme from backend or local storage on mount
        const loadTheme = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const res = await getSettings();
                if (res.ok && res.data.theme) {
                    setTheme(res.data.theme);
                }
            }
        };
        loadTheme();
    }, []);

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
