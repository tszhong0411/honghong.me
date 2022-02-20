import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function LanguageSwitch() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const changeLanguage = (locale) => {
        router.push(router.asPath, router.asPath, { locale });
    };

    // https://github.com/framer/motion/issues/578
    const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <>
            <motion.button
                className="ml-1 h-11 w-11 p-1 px-2 text-[22.4px] sm:ml-4"
                whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 },
                }}
                onClick={() => {
                    !open ? setOpen(true) : setOpen(false);
                }}
            >
                <i className="fa-solid fa-globe"></i>
            </motion.button>
            {isLoaded && (
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className="fixed top-[64px] right-0 flex flex-row gap-x-8 rounded-md border-2 border-slate-900/10 bg-white py-4 px-6 dark:border-slate-300/10 dark:bg-gray-900 xl:absolute xl:top-[56px]"
                            animate={{ y: 0 }}
                            initial={{ y: -200 }}
                            exit={{ y: -200, opacity: 0 }}
                        >
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    setOpen(false);
                                    changeLanguage("zh-TW");
                                }}
                            >
                                繁體中文
                            </div>
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    setOpen(false);
                                    changeLanguage("en");
                                }}
                            >
                                English
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </>
    );
}
