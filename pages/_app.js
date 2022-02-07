/* eslint-disable no-irregular-whitespace */
import "@/css/tailwind.css";
import "@/css/prism.css";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { useEffect } from "react";
import CdnList from "@/data/cdnList";
import siteMetadata from "@/data/siteMetadata";
import Analytics from "@/components/analytics";
import LayoutWrapper from "@/components/LayoutWrapper";
import { ClientReload } from "@/components/ClientReload";

const isDevelopment = process.env.NODE_ENV === "development";
const isSocket = process.env.SOCKET;

export default function App({ Component, pageProps }) {
    useEffect(() => {
        CdnList.css.map((item) => {
            var style = document.createElement("link");
            style.setAttribute("rel", "stylesheet");
            style.setAttribute("href", item);
            document.querySelector("head").appendChild(style);
        });
        CdnList.javascript.map((item) => {
            var script = document.createElement("script");
            script.src = item;
            document.querySelector("head").appendChild(script);
        });
        window.addEventListener("load", () => {
            console.log(`
▀█▀ █▀ ▀█ █ █ █▀█ █▄ █ █▀▀   ▀█▀ █▀█ █▀█
 █  ▄█ █▄ █▀█ █▄█ █ ▀█ █▄█ ▄  █  █▄█ █▀▀\n\nFacebook --> https://www.facebook.com/tszhonglai.0411/\nInstagram --> https://www.instagram.com/tszhong0411/\nCodepen -->https://codepen.io/tszhong0411\nGithub --> https://github.com/tszhong0411`);
        });
    });
    return (
        <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
            <Head>
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
            </Head>
            {isDevelopment && isSocket && <ClientReload />}
            <Analytics />
            <LayoutWrapper>
                <Component {...pageProps} />
            </LayoutWrapper>
        </ThemeProvider>
    );
}
