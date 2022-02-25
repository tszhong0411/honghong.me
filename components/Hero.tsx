import Image from "next/image";
import Link from "@/components/Link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <>
      <div className="mx-auto mt-12 mb-24 flex max-w-3xl items-center justify-between">
        <div>
          <h1 className="pb-6 text-3xl font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            小康
          </h1>
          <p className="text-gray-700 dark:text-gray-300">A teenager who loves web development</p>
          <div>
            <ul className="flex gap-x-2 text-sm text-gray-500 dark:text-gray-400">
              <li>#react</li>
              <li>#next.js</li>
              <li>#tailwind</li>
            </ul>
          </div>
          <div className="mt-8">
            <div className="inline-flex flex-col gap-x-4 gap-y-3 sm:flex-row">
              <Link
                href="https://instagram.com/tszhong0411/"
                className="border-b-2 border-transparent duration-300  hover:border-themeColor-500 dark:hover:border-themeColor-350"
              >
                <i className="fa-brands fa-instagram mr-1"></i>
                Instagram
              </Link>
              <Link
                href="https://github.com/tszhong0411"
                className="border-b-2 border-transparent duration-300  hover:border-themeColor-500 dark:hover:border-themeColor-350"
              >
                <i className="fa-brands fa-github mr-1"></i>
                Github
              </Link>
              <Link
                href="https://honghong.me/youtube"
                className="border-b-2 border-transparent duration-300  hover:border-themeColor-500 dark:hover:border-themeColor-350"
              >
                <i className="fa-brands fa-youtube mr-1"></i>
                Youtube
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.3 }}>
            <Image
              src="/static/images/avatar.png"
              alt="Avatar"
              height="130px"
              width="130px"
              className="transform select-none rounded-full duration-700 ease-in-out hover:rotate-[360deg]"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
