import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), []);

    return (
        <motion.button
            whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
            }}
            whileTap={{
                scale: 0.7,
                rotate: 360,
                transition: { duration: 0.2 },
            }}
            aria-label="Toggle Dark Mode"
            type="button"
            className="ml-1 h-11 w-11 p-1 px-2 text-[18px] sm:ml-4"
            onClick={() =>
                setTheme(
                    theme === "dark" || resolvedTheme === "dark"
                        ? "light"
                        : "dark",
                )
            }
        >
            {mounted && (theme === "dark" || resolvedTheme === "dark") ? (
                <i className="fa-solid fa-sun"></i>
            ) : (
                <i className="fa-solid fa-moon"></i>
            )}
        </motion.button>
    );
};

export default ThemeSwitch;
