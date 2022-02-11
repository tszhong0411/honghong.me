import siteMetadata from "@/data/siteMetadata";
import { PageSEO } from "@/components/SEO";
import { pcSpecsList } from "@/data/pcSpecsList";

export default function PcSpecs() {
    return (
        <>
            <PageSEO
                title={`電腦配置 - ${siteMetadata.author}`}
                description={"小康在 2021 年 4 月購買的電腦的配置"}
            />
            <div className="mx-auto flex flex-col justify-center">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                    電腦配置
                </h1>
                <p className="mb-12 text-gray-600 dark:text-gray-400">
                    小康在 2021 年 4 月購買的電腦的配置
                </p>
                <div className="prose max-w-full dark:prose-dark">
                    <div className="flex flex-wrap">
                        <table className="m-auto w-full table-fixed">
                            <thead>
                                <tr>
                                    <th className="w-1/4 border border-solid border-black bg-gray-100 px-4 py-4 text-black dark:bg-gray-900">
                                        硬件
                                    </th>
                                    <th className="w-1/2 border border-solid border-black bg-gray-100 px-4 py-4 text-black dark:bg-gray-900">
                                        型號
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pcSpecsList.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                                                {item.name}
                                            </td>
                                            <td className="border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                                                {item.content}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
