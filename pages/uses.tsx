import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import Image from "@/components/PostImage";
import Link from "@/components/Link";
import useTranslation from "next-translate/useTranslation";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return { props: { locale } };
};

export default function Uses({ locale }) {
  const { t } = useTranslation();

  return (
    <>
      <PageSEO
        title={`Uses - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
      />
      <div className="mx-auto flex flex-col justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          My Gear
        </h1>
        <p className="mb-12 text-gray-600 dark:text-gray-400">{t("uses:description")}</p>
        <div className="prose dark:prose-dark">
          <Image
            src="/static/images/desk.webp"
            alt="Desk"
            width="4032"
            height="3024"
            className="custom-image"
          />
          <h2>Main equipment</h2>
          <ul>
            <li>
              PC: <Link href="/pc-specs">Specs</Link>
            </li>
            <li>24" AOC G2490W1G4</li>
            <li>Logitech G402 Hyperion Fury Mouse</li>
            <li>Apple iPhone 13 Pro (128GB)</li>
            <li>Apple iPad 8 (128GB)</li>
          </ul>
          <h2>Coding</h2>
          <ul>
            <li>Editor: Visual Studio Code</li>
            <li>
              Theme:{" "}
              <Link href="https://marketplace.visualstudio.com/items?itemName=enkia.tokyo-night">
                Tokyo Night - Tokyo Night Storm
              </Link>
            </li>
            <li>Terminal: PowerShell 7</li>
          </ul>
          <h2>Software</h2>
          <ul>
            <li>Adobe Premiere Pro 2022</li>
            <li>Adobe Photoshop 2022</li>
            <li>Adobe After Effects 2022</li>
            <li>Spotify</li>
            <li>Postman</li>
            <li>Chrome</li>
            <li>Caesium</li>
            <li>Figma</li>
            <li>OBS</li>
          </ul>
        </div>
      </div>
    </>
  );
}
