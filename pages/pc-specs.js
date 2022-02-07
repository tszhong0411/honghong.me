import siteMetadata from "@/data/siteMetadata";
import { PageSEO } from "@/components/SEO";
import { pcSpecsList } from "@/data/pcSpecsList";

export default function PcSpecs() {
    return (
        <>
            <PageSEO
                title={`電腦配置 - ${siteMetadata.author}`}
                description={siteMetadata.description}
            />
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        電腦配置
                    </h1>
                </div>
                <div className="container prose max-w-full py-12 dark:prose-dark">
                    <div className="-m-4 flex flex-wrap">
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
