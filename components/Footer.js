import NowPlaying from "./NowPlaying";
import Link from "./Link";
import siteMetadata from "@/data/siteMetadata";
import footerNavLinks from "@/data/footerNavLinks";
import { useState, useEffect } from "react";
import moment from "moment";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function Footer() {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useSWR("/api/repoReleases", fetcher);

    useEffect(() => {
        data &&
            data.forEach((release) => {
                if (!release.draft && !release.prerelease) {
                    document.querySelector("#releases").innerHTML += `
                <div class="release">
                    <div class="title">${release.name}</div>
                    <div class="date">${moment(release.published_at).format(
                        "DD MMM YYYY"
                    )}</div>
                    <div class="body">${release.body.replace(
                        /\r\n/g,
                        "<br>"
                    )}</div>
                </div>
                `;
                }
            });
    }, [data]);

    const releaseHandler = (e) => {
        if (
            e.target.id === "versionHistoryWrapper" ||
            e.target.id === "version"
        ) {
            isOpen ? setIsOpen(false) : setIsOpen(true);
        }
    };
    return (
        <>
            <footer className="mt-[2rem] flex flex-col">
                <div className="mx-auto mt-[20px] mb-[60px] flex w-full max-w-3xl flex-wrap py-0 px-[20px] xl:max-w-5xl ">
                    <hr className="border-1 mb-8 w-full border-gray-200 dark:border-gray-800" />
                    <NowPlaying />
                    <div className="grid w-full grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
                        {footerNavLinks.middleLinks.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col space-y-4"
                                >
                                    {item.list.map((item, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                className="transitio text-gray-500 hover:text-gray-600"
                                            >
                                                {item.title}
                                            </Link>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="mx-auto mb-8 flex w-full max-w-3xl flex-wrap justify-between px-[20px] xl:max-w-5xl ">
                    <div>
                        {footerNavLinks.bottomLinks.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="mr-4 text-base font-medium"
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="font-semibold">
                        © {new Date().getFullYear()} {siteMetadata.author}{" "}
                        <span
                            className="cursor-pointer hover:text-red-500"
                            onClick={(e) => releaseHandler(e)}
                            id="version"
                        >
                            {data ? data[0].name : "Loading.."}
                        </span>
                    </div>
                </div>
            </footer>
            <div
                className={`${
                    isOpen ? "grid" : "hidden"
                } fixed left-0 top-0 z-[1000] h-full w-full items-start justify-center bg-black-75 py-[5rem] px-0`}
                id="versionHistoryWrapper"
                onClick={(e) => releaseHandler(e)}
            >
                <div className="z-[1100] grid h-full w-[75vw] gap-[1rem] overflow-y-scroll rounded-[0.5rem] bg-[#111] p-[1rem] sm:p-[2rem]">
                    <div className="grid gap-[4rem]" id="releases"></div>
                </div>
            </div>
        </>
    );
}
