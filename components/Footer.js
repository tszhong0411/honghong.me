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
            <footer className="mt-[2rem] flex flex-col">
                <div className="mx-auto mt-[20px] flex w-full max-w-7xl flex-wrap py-0 px-[20px] ">
                    <hr className="border-1 mb-8 w-full border-gray-200 dark:border-gray-800" />
                    <div className="mb-12">
                        <Link href="/" aria-label={siteMetadata.headerTitle}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.0"
                                width="582.000000pt"
                                height="195.000000pt"
                                className="h-12 w-16"
                                viewBox="0 0 582.000000 195.000000"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <g
                                    transform="translate(0.000000,195.000000) scale(0.100000,-0.100000)"
                                    fill="#ff4532"
                                    stroke="none"
                                >
                                    <path d="M1995 1934 c-292 -42 -442 -162 -525 -420 -48 -152 -64 -288 -64 -559 -1 -327 21 -473 95 -632 67 -146 169 -229 336 -275 65 -17 106 -21 253 -21 149 0 187 3 255 21 124 34 195 73 263 147 94 100 154 248 183 455 21 142 18 577 -4 702 -71 405 -258 577 -632 584 -71 1 -143 0 -160 -2z m432 -179 c105 -53 203 -190 203 -287 0 -52 -18 -78 -54 -78 -31 0 -50 24 -76 94 -23 59 -75 121 -152 179 -54 40 -62 59 -37 91 26 33 52 33 116 1z m-259 -344 c49 -25 66 -45 96 -113 31 -71 43 -141 52 -303 13 -271 -31 -428 -133 -471 -43 -18 -127 -18 -167 1 -36 17 -81 81 -98 140 -16 54 -15 430 1 514 40 210 129 293 249 232z m480 -71 c27 -26 28 -64 2 -90 -24 -24 -29 -24 -58 -4 -26 18 -29 59 -6 92 19 27 34 28 62 2z" />
                                    <path d="M4990 1934 c-293 -59 -445 -258 -502 -659 -16 -116 -16 -518 1 -649 29 -223 83 -360 183 -460 116 -116 246 -159 473 -160 214 0 318 36 420 146 97 104 135 216 135 394 l0 111 38 15 c30 11 44 26 60 60 37 75 25 211 -24 263 l-23 25 -288 -6 c-158 -4 -296 -11 -306 -16 -29 -15 -47 -71 -47 -145 0 -133 29 -179 121 -189 l59 -7 0 -57 c0 -82 -19 -102 -99 -108 -37 -3 -73 1 -92 8 -43 18 -85 80 -112 164 -20 64 -22 91 -22 276 1 154 5 223 18 278 18 81 60 172 93 203 46 44 160 43 195 0 11 -13 19 -50 24 -100 8 -93 30 -136 80 -157 43 -18 115 -18 182 0 113 30 152 88 153 224 0 217 -83 395 -224 477 -90 52 -160 67 -321 71 -82 1 -161 0 -175 -2z m454 -154 c106 -65 168 -271 95 -311 -37 -19 -58 -1 -99 84 -21 45 -53 108 -71 139 -29 49 -31 60 -21 82 14 32 51 34 96 6z m168 -373 c13 -21 9 -70 -9 -89 -41 -45 -101 0 -89 67 4 19 14 39 23 44 19 10 63 -3 75 -22z m122 -446 c39 -41 48 -112 16 -134 -12 -8 -28 -13 -35 -11 -20 8 -65 150 -52 163 18 18 42 12 71 -18z" />
                                    <path d="M975 1905 c-5 -2 -27 -6 -48 -10 -41 -7 -95 -49 -126 -99 -44 -71 -53 -136 -52 -393 l1 -243 -131 0 -131 0 6 38 c3 20 7 147 8 282 3 270 -1 301 -53 344 -54 45 -181 67 -269 46 -69 -17 -123 -69 -146 -142 -21 -67 -36 -652 -32 -1198 3 -322 5 -369 20 -396 23 -43 71 -81 116 -94 54 -15 207 -13 245 4 42 18 82 61 103 111 23 55 30 244 14 411 -7 74 -9 138 -6 141 4 4 61 9 127 11 l120 5 -7 -39 c-13 -70 -10 -375 5 -442 19 -88 65 -161 121 -192 39 -22 57 -25 132 -24 152 1 220 51 238 176 5 34 10 390 10 789 0 798 0 794 -60 856 -17 18 -46 36 -63 42 -36 11 -127 21 -142 16z m-578 -133 c18 -11 43 -77 43 -111 0 -64 -34 -106 -68 -84 -9 5 -22 36 -29 69 -8 32 -16 69 -19 82 -11 40 36 68 73 44z m727 -54 c35 -55 47 -251 18 -308 -22 -45 -63 -53 -86 -17 -22 33 -27 281 -7 320 18 34 55 36 75 5z m21 -414 c40 -40 -12 -124 -68 -110 -29 7 -37 28 -25 70 13 51 61 71 93 40z" />
                                    <path d="M3163 1891 c-47 -12 -100 -56 -123 -102 -51 -99 -64 -223 -81 -764 -12 -388 -3 -752 22 -851 25 -99 115 -150 259 -148 120 2 172 36 200 129 8 28 10 144 8 398 -2 196 0 357 3 357 3 0 11 -19 18 -42 17 -57 111 -253 201 -418 167 -308 269 -410 410 -410 116 0 173 31 199 109 39 117 62 629 54 1200 -5 403 -7 414 -78 480 -107 99 -302 92 -373 -13 -41 -61 -44 -99 -36 -498 4 -208 4 -378 0 -378 -12 0 -90 177 -156 351 -80 212 -156 394 -186 444 -33 57 -91 111 -146 135 -52 23 -147 33 -195 21z m244 -175 c57 -73 81 -176 44 -196 -36 -19 -50 -11 -77 43 -15 28 -40 71 -56 95 -34 49 -33 81 1 99 30 15 51 5 88 -41z m821 -1 c31 -40 47 -154 35 -253 -11 -91 -29 -122 -72 -122 -42 0 -55 32 -59 153 -5 137 3 193 33 223 30 30 39 30 63 -1z m2 -441 c34 -40 1 -114 -51 -114 -38 0 -54 30 -40 72 18 52 65 74 91 42z" />
                                </g>
                            </svg>
                        </Link>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-4 pb-16 sm:grid-cols-3">
                        {footerNavLinks.middleLinks.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="mb-10 flex flex-col space-y-4 pr-4"
                                >
                                    {item.list.map((item, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                href={
                                                    item.href === "/feed.xml"
                                                        ? `/feed${
                                                              locale ===
                                                              defaultLocale
                                                                  ? ""
                                                                  : `.${locale}`
                                                          }.xml`
                                                        : item.href
                                                }
                                                className="hover:text-[#ff4532] hover:underline"
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
                <div className="mx-auto mb-8 flex w-full max-w-7xl flex-wrap justify-between px-[20px]">
                    <div>
                        {footerNavLinks.bottomLinks.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="mr-4 text-base font-medium hover:text-[#ff4532] dark:hover:text-[#ff4532]"
                                >
                                    {t(
                                        `footerNavLinks:${item.title.toLowerCase()}`,
                                    )}
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
