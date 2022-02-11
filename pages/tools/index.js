import { PageSEO } from "@/components/SEO";
import Link from "@/components/Link";
import { toolsList } from "@/data/toolsList";
import siteMetadata from "@/data/siteMetadata";

export default function Index() {
    return (
        <>
            <PageSEO
                title={`工具 - ${siteMetadata.author}`}
                description={"小康製作的小工具"}
            />
            <div className="mx-auto flex flex-col justify-center">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                    Tools
                </h1>
                <p className="mb-12 text-gray-600 dark:text-gray-400">
                    小康製作的小工具
                </p>
                {toolsList.Category.map((a, index) => {
                    return (
                        <div key={index}>
                            <h2 className="mt-8 text-2xl font-bold">
                                {a.name}
                            </h2>
                            <div className="text-md mt-[0.2rem] mb-[0.5rem] font-bold">
                                <span style={{ fontStyle: "italic" }}>
                                    {a.desc}
                                </span>
                            </div>
                            <div className="grid gap-[1em] overflow-auto px-[10px] pt-[10px] text-center md:grid-cols-2 lg:grid-cols-3">
                                {toolsList.ToolsList[a.name].map((b, index) => {
                                    return (
                                        <div
                                            className="relative float-left my-[15px] mx-[7px] h-[90px] overflow-hidden rounded-[8px] leading-[17px] transition-all duration-300 ease-[ease] hover:bg-red-500 hover:text-white"
                                            key={index}
                                        >
                                            <Link href={b.url} title={b.name}>
                                                <div className="float-left my-[15px] mx-[10px] h-[60px] w-[60px] rounded-full">
                                                    <img
                                                        src={b.img}
                                                        alt={b.name}
                                                        className="rounded-xl"
                                                    />
                                                </div>
                                                <div className="h-[40px] overflow-hidden text-ellipsis whitespace-nowrap pt-[16px] pr-[10px] pb-0 pl-0 text-[1.43em] font-bold">
                                                    {b.name}
                                                </div>
                                                <div className="h-[50px] overflow-hidden text-ellipsis whitespace-nowrap pt-[16px] pr-[10px] pb-[16px] pl-0 text-[0.93em]">
                                                    {b.desc}
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
