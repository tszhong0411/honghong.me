import siteMetadata from "@/data/siteMetadata";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";
import ThemeSwitch from "./ThemeSwitch";
import LanguageSwitch from "./LanguageSwitch";
import MobileNav from "@/components/MobileNav";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link
      data-cy="nav-item"
      href={href}
      className={`hover:text-themeColor-500 dark:hover:text-themeColor-350 ${
        isActive
          ? "text-themeColor-500 dark:text-themeColor-350"
          : "text-slate-700 dark:text-slate-200"
      } hidden rounded-lg py-1 px-2 font-semibold transition-all  sm:inline-block sm:py-3 md:px-4`}
    >
      <span>{text}</span>
    </Link>
  );
}

function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return isTop;
}

export default function Navbar() {
  const isTop = useIsScrollTop();
  const [navShow, setNavShow] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 h-full w-full"
          onClick={() => {
            setOpen(false);
          }}
          aria-hidden="true"
        ></div>
      )}
      <header
        className={`duration-0 sticky top-0 z-40 w-full flex-none transition-colors lg:z-50 ${
          isTop
            ? "supports-backdrop-blur:bg-white/60 dark:bg-transparent"
            : `supports-backdrop-blur:bg-white/95 ${
                navShow
                  ? "bg-white dark:bg-gray-900"
                  : "bg-white/75 backdrop-blur dark:bg-gray-900/75"
              }`
        }`}
      >
        <div className="mx-auto max-w-3xl">
          <div className="py-2 px-4 xl:px-0">
            <div className="relative flex items-center justify-between">
              <div className="flex items-center text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
                <div className="sm:hidden">
                  <Link href="/" aria-label={siteMetadata.headerTitle}>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 100 168"
                      className="ml-4 fill-themeColor-500 dark:fill-themeColor-350"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M36 85V71L64 55V69L36 85Z" />
                      <path d="M76 62V48L82.5 44.5L76 41H64V20L100 41V44.5V48L76 62Z" />
                      <path d="M64 83L64 97L36 113L36 99L64 83Z" />
                      <path d="M24 106L24 120L17.5 123.5L24 127H36V148L0 127V123.5V120L24 106Z" />
                      <path d="M76 41V48V150L88 144V69L100 62V150L76 164L70.5 168L64 165V48V41H76Z" />
                      <path d="M24 127V120L24 18L12 24L12 99L0 106L0 18L24 4L29.5 0L36 3L36 120V127H24Z" />
                    </svg>
                  </Link>
                </div>
                <div className="hidden sm:block">
                  {headerNavLinks.map((link, index) => (
                    <NavItem key={index} href={link.href} text={link.title} />
                  ))}
                </div>
              </div>
              <div className="flex items-center border-l border-gray-200 dark:border-gray-700">
                <ThemeSwitch />
                <LanguageSwitch open={open} setOpen={setOpen} />
                <MobileNav navShow={navShow} setNavShow={setNavShow} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
