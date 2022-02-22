import NowPlaying from "./NowPlaying";
import Link from "./Link";
import siteMetadata from "@/data/siteMetadata";
import footerNavLinks from "@/data/footerNavLinks";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

export default function Footer() {
  const { t } = useTranslation();
  const { locale, defaultLocale } = useRouter();

  return (
    <>
      <footer className="mx-auto mt-[2rem] w-full max-w-3xl">
        <div className="mx-auto mt-[20px] flex w-full flex-wrap py-0 px-[20px] ">
          <hr className="border-1 mb-8 w-full border-gray-200 dark:border-gray-800" />
          <div className="mb-12">
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <svg
                width="56"
                height="56"
                viewBox="0 0 100 168"
                className="fill-black dark:fill-white"
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
          <div className="grid w-full grid-cols-2 gap-4 pb-16 sm:grid-cols-3">
            {footerNavLinks.middleLinks.map((item, index) => {
              return (
                <div key={index} className="mb-10 flex flex-col space-y-4 pr-4">
                  {item.list.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        href={
                          item.href === "/feed.xml"
                            ? `/feed${locale === defaultLocale ? "" : `.${locale}`}.xml`
                            : item.href
                        }
                        className="hover:text-themeColor-500 hover:underline dark:hover:text-themeColor-350"
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <NowPlaying />
        </div>
        <div className="mx-auto mb-8 flex w-full flex-wrap justify-between px-[20px]">
          <div>
            {footerNavLinks.bottomLinks.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="mr-4 text-base font-medium hover:text-themeColor-500 dark:hover:text-themeColor-350"
                >
                  {t(`footerNavLinks:${item.title.toLowerCase()}`)}
                </Link>
              );
            })}
          </div>
          <div className="font-semibold">
            © {new Date().getFullYear()} {siteMetadata.author}
          </div>
        </div>
      </footer>
    </>
  );
}
