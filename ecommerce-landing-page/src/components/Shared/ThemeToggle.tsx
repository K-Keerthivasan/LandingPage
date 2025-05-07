// components/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Ensure the component is mounted to avoid hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="mt-8 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
            Toggle {resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
    );
}
