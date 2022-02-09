import siteMetadata from "@/data/siteMetadata";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 bg-white/95 dark:bg-dark/95">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between py-8 px-[20px] xl:max-w-5xl">
                <div>
                    <Link href="/" aria-label={siteMetadata.headerTitle}>
                        <img
                            src="/static/images/HONG.png"
                            width="109.2125"
                            height="50.8333333"
                            alt="avatar"
                        />
                    </Link>
                </div>
                <div className="flex items-center text-base leading-5">
                    <div className="hidden sm:block">
                        {headerNavLinks.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="rounded-lg p-1 font-medium text-gray-900 hover:bg-gray-300 dark:text-gray-100 dark:hover:bg-gray-800 sm:p-4"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                    <ThemeSwitch />
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
