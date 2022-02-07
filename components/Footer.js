import NowPlaying from "./NowPlaying";
import Link from "./Link";
import siteMetadata from "@/data/siteMetadata";
import footerNavLinks from "@/data/footerNavLinks";
import { useState, useEffect } from "react";
import moment from "moment";

export default function Footer() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch("https://api.github.com/repos/tszhong0411/home/releases")
            .then((res) => res.text())
            .then((result) => {
                var data = JSON.parse(result);
                document.querySelector("#version").innerHTML = data[0].name;

                data.forEach((release) => {
                    if (!release.draft && !release.prerelease) {
                        document.querySelector("#releases").innerHTML += `
          <div class="release">
            <div class="title">${release.name}</div>
            <div class="date">${moment(release.published_at).format(
                "DD MMM YYYY"
            )}</div>
            <div class="body">${release.body.replace(/\r\n/g, "<br>")}</div>
          </div>
          `;
                    }
                });
            });
    }, []);

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
                <div className="mx-auto mt-[20px] mb-[60px] flex w-full max-w-3xl flex-wrap py-0 px-[20px] xl:max-w-5xl">
                    {footerNavLinks.middleLinks.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="w-full sm:w-1/2 md:w-1/4"
                            >
                                <h3 className="mt-[1rem] mb-[0.7rem] pt-[0.5rem] pl-0 text-[16px] font-semibold text-[#707070]">
                                    {item.name}
                                </h3>
                                <div className="flex flex-col">
                                    {item.list.map((item, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                className="my-1 mr-auto text-[16px]"
                                            >
                                                <i className={item.class}></i>{" "}
                                                {item.title}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mx-auto mb-8 flex w-full max-w-3xl flex-wrap justify-between px-[20px] xl:max-w-5xl">
                    <NowPlaying />
                    <div>
                        {footerNavLinks.bottomLinks.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="mr-4 text-base font-bold"
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="font-semibold text-gray-500">
                        © {new Date().getFullYear()} {siteMetadata.author}{" "}
                        <span
                            className="cursor-pointer hover:text-red-500"
                            id="version"
                            onClick={(e) => releaseHandler(e)}
                        ></span>
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
