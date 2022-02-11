import Image from "next/image";
import { PageSEO } from "@/components/SEO";
import Link from "@/components/Link";

export default function AuthorLayout({ children, frontMatter }) {
    const {
        name,
        avatar,
        occupation,
        location,
        email,
        twitter,
        instagram,
        github,
        facebook,
        description,
    } = frontMatter;

    return (
        <>
            <PageSEO
                title={`關於 - ${name}`}
                description={`關於我 - ${name}`}
            />
            <div className="mx-auto flex flex-col justify-center">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                    關於
                </h1>
                <p className="mb-12 text-gray-600 dark:text-gray-400">
                    {description}
                </p>
                <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
                    <div className="flex flex-col items-center space-x-2 pt-8">
                        <Image
                            src={avatar}
                            alt="avatar"
                            width="192px"
                            height="192px"
                            className="h-48 w-48 rounded-full"
                        />
                        <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
                            {name}
                        </h3>
                        <div className="text-center">
                            <div className="text-gray-500 dark:text-gray-400">
                                <i className="fas fa-user"></i>
                                {" " + occupation}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">
                                <i className="fas fa-map-pin"></i>
                                {" " + location}
                            </div>
                        </div>
                        <div className="flex space-x-3 pt-6">
                            <Link
                                href={`mailto:${email}`}
                                className="dark:brightness-0 dark:invert-[1]"
                            >
                                <Image
                                    src="/static/images/email.svg"
                                    height={30}
                                    width={30}
                                    alt="Social icon"
                                />
                            </Link>
                            <Link href={facebook}>
                                <Image
                                    src="/static/images/facebook.svg"
                                    height={30}
                                    width={30}
                                    alt="Social icon"
                                />
                            </Link>
                            <Link href={instagram}>
                                <Image
                                    src="/static/images/instagram.svg"
                                    height={30}
                                    width={30}
                                    alt="Social icon"
                                />
                            </Link>
                            <Link
                                href={github}
                                className="dark:brightness-0 dark:invert-[1]"
                            >
                                <Image
                                    src="/static/images/github.svg"
                                    height={30}
                                    width={30}
                                    alt="Social icon"
                                />
                            </Link>
                            <Link href={twitter}>
                                <Image
                                    src="/static/images/twitter.svg"
                                    height={30}
                                    width={30}
                                    alt="Social icon"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
                        {children}
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&amp;logo=html5&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&amp;logo=css3&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&amp;logo=javascript&amp;logoColor=%23F7DF1E"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&amp;logo=jquery&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&amp;logo=php&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&amp;logo=markdown&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&amp;logo=bootstrap&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&amp;logo=tailwind-css&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&amp;logo=SASS&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/stylus-%23ff6347.svg?style=for-the-badge&amp;logo=stylus&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&amp;logo=typescript&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&amp;logo=vuedotjs&amp;logoColor=%234FC08D"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&amp;logo=react&amp;logoColor=%2361DAFB"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/Next-black?style=for-the-badge&amp;logo=next.js&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&amp;logo=react&amp;logoColor=%2361DAFB"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&amp;logo=Flutter&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&amp;logo=expo&amp;logoColor=#D04A37"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&amp;logo=yarn&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&amp;logo=npm&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&amp;logo=git&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&amp;logo=firebase"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&amp;logo=Cloudflare&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&amp;logo=vercel&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&amp;logo=mongodb&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/GULP-%23CF4647.svg?style=for-the-badge&amp;logo=gulp&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&amp;logo=chart.js&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&amp;logo=figma&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&amp;logo=Canva&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/adobeillustrator-%23FF9A00.svg?style=for-the-badge&amp;logo=adobeillustrator&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/adobephotoshop-%2331A8FF.svg?style=for-the-badge&amp;logo=adobephotoshop&amp;logoColor=white"
                    />
                    <img
                        alt="shields"
                        src="https://img.shields.io/badge/Adobe%20Premiere%20Pro-9999FF.svg?style=for-the-badge&amp;logo=Adobe%20Premiere%20Pro&amp;logoColor=white"
                    />
                </div>
            </div>
        </>
    );
}
