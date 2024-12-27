import { useState } from "react";

import { SunIcon } from 'lucide-react'
import { MoonStarIcon } from 'lucide-react'

type AppTheme = 'light' | 'dark';

const getDefaultTheme: () => AppTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    return 'light';
};

export const ToggleThemeButton = () => {
    const [theme, setTheme] = useState<AppTheme>(getDefaultTheme());

    const isDark = theme === 'dark';

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    }

    return (
        <div
            className="tooltip tooltip-bottom"
            data-tip={!isDark ? 'dark' : 'light'}
        >
            <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-sm btn-circle"
            >
                {isDark ? <SunIcon /> : <MoonStarIcon />}
            </button>
        </div>
    )
}