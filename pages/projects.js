import siteMetadata from "@/data/siteMetadata";
import projectsData from "@/data/projectsData";
import Card from "@/components/Card";
import { PageSEO } from "@/components/SEO";

export default function Projects() {
    return (
        <>
            <PageSEO
                title={`Projects - ${siteMetadata.author}`}
                description={"小康製作的項目"}
            />
            <div className="mx-auto flex flex-col justify-center">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                    Projects
                </h1>
                <p className="mb-12 text-gray-600 dark:text-gray-400">
                    這是我在網頁開發上的項目
                </p>
                <div className="-m-4 flex flex-wrap">
                    {projectsData.map((d) => (
                        <Card
                            key={d.title}
                            title={d.title}
                            description={d.description}
                            imgSrc={d.imgSrc}
                            href={d.href}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
