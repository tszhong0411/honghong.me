import { useState, useEffect } from "react";
import Link from "./Link";
import headerNavLinks from "@/data/headerNavLinks";
import { useTheme } from "next-themes";

const MobileNav = () => {
    const [navShow, setNavShow] = useState(false);
    const [mode, setMode] = useState();
    const { theme, resolvedTheme } = useTheme();

    const onToggleNav = () => {
        setNavShow((status) => {
            if (status) {
                document.body.style.overflow = "auto";
            } else {
                // Prevent scrolling
                document.body.style.overflow = "hidden";
            }
            return !status;
        });
    };

    useEffect(() => {
        setMode(theme === "dark" || resolvedTheme === "dark");
    }, [resolvedTheme, theme]);

    return (
        <div className="sm:hidden">
            <div onClick={onToggleNav}>
                <div className="relative h-12 w-12 cursor-pointer select-none transition-all duration-[0.4s] ease-[cubic-bezier(0,0,0,1)] ">
                    <div
                        className={`duration-[0.2s] ease-[cubic-bezier(0,0,0,1)] ${
                            navShow
                                ? "translate-y-[7px] transition-all"
                                : "transform-none delay-[0.2s]"
                        }`}
                    >
                        <div
                            className={`absolute left-[12px] top-[16px] h-[2px] w-[24px] rounded-[9em] duration-[0.2s] ease-[cubic-bezier(0,0,0,1)] ${
                                navShow
                                    ? "rotate-[45deg] transition-all delay-[0.2s]"
                                    : "transform-none "
                            } ${mode ? "bg-[#f5f5f5]" : "bg-[#171717]"}`}
                        ></div>
                    </div>
                    <div
                        className={`duration-[0.2s] ease-[cubic-bezier(0,0,0,1)] ${
                            navShow
                                ? "opacity-[0] transition-all"
                                : "opacity-[1]"
                        }`}
                    >
                        <div
                            className={`absolute left-[12px] top-[23px] h-[2px] w-[24px] transform-none rounded-[9em] duration-[0.2s] ease-[cubic-bezier(0,0,0,1)] ${
                                mode ? "bg-[#f5f5f5]" : "bg-[#171717]"
                            }`}
                        ></div>
                    </div>
                    <div
                        className={`duration-[0.2s] ease-[cubic-bezier(0,0,0,1)] ${
                            navShow
                                ? "translate-y-[-7px] transition-all"
                                : "transform-none delay-[0.2s]"
                        }`}
                    >
                        <div
                            className={`absolute left-[12px] top-[30px] h-[2px] w-[24px] rounded-[9em] duration-[0.2s] ease-[cubic-bezier(0,0,0,1)] ${
                                navShow
                                    ? "rotate-[-45deg] transition-all delay-[0.2s]"
                                    : "transform-none"
                            } ${mode ? "bg-[#f5f5f5]" : "bg-[#171717]"}`}
                        ></div>
                    </div>
                </div>
            </div>
            <div
                className={`fixed top-[104px] right-0 z-10 h-full w-full transform bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-black ${
                    navShow ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <nav className="fixed mt-8 h-full w-full">
                    {headerNavLinks.map((link) => (
                        <div
                            key={link.title}
                            className="hover:bg-gray-300 dark:hover:bg-gray-700"
                        >
                            <Link
                                href={link.href}
                                className="block px-12 py-4 text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                                onClick={onToggleNav}
                            >
                                {link.title}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MobileNav;
