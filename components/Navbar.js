import siteMetadata from "@/data/siteMetadata";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";
import { useRouter } from "next/router";

function NavItem({ href, text }) {
    const router = useRouter();
    const isActive = router.asPath === href;

    return (
        <Link
            href={href}
            className={`${
                isActive
                    ? "font-semibold text-gray-800 dark:text-gray-200"
                    : "font-normal text-gray-600 dark:text-gray-400"
            } hidden rounded-lg p-1 transition-all hover:bg-gray-200 dark:hover:bg-gray-800 sm:inline-block sm:px-4 sm:py-3`}
        >
            <span className="capsize">{text}</span>
        </Link>
    );
}
export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 bg-[#f9fafb]/95 dark:bg-gray-900/95">
            <a href="#skip" className="skip-nav">
                Skip to content
            </a>
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between py-8 px-[20px] xl:max-w-5xl ">
                <div>
                    <Link href="/" aria-label={siteMetadata.headerTitle}>
                        <img
                            src="/static/images/HONG.webp"
                            width="80"
                            height="24.38"
                            alt="avatar"
                        />
                    </Link>
                </div>
                <div className="flex items-center text-base leading-5">
                    <div className="hidden sm:block">
                        {headerNavLinks.map((link, index) => (
                            <NavItem
                                key={index}
                                href={link.href}
                                text={link.title}
                            />
                        ))}
                    </div>
                    <ThemeSwitch />
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
