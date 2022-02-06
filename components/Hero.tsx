import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'

export default function Hero() {
  return (
    <>
      <div className="my-6 flex flex-col items-center gap-x-12 xl:mb-12 xl:flex-row">
        <div className="pt-6">
          <h1 className="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            哈囉，我是小康
          </h1>
          <h2 className="prose text-lg text-gray-600 dark:text-gray-400">
            {`歡迎來到${siteMetadata.description}我現在是一名學生，編寫網頁是我的興趣。在空閒時間，我喜歡開發 `}
            <Link href="/projects">不同項目</Link>
            {' 和寫 '}
            <Link href="/blog">Blog</Link>
            {'。'}
          </h2>
        </div>
        <div className="grid grid-cols-1 grid-rows-3 gap-8 py-12">
          <div className="my-2 grid items-start gap-8">
            <div className="group relative">
              <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
              <Link
                href="/blog"
                className="relative flex items-center justify-between divide-x divide-gray-600 rounded-lg bg-white px-7 py-4 leading-none dark:bg-black"
              >
                <span className="flex items-center space-x-5">
                  <img src="/static/images/blog.svg" alt="Blog svg" className="h-6 w-6 -rotate-6" />
                  <span className="pr-6 text-gray-900 dark:text-gray-100">
                    各種軟件推薦和介紹，分享編寫網頁技巧、教學。
                  </span>
                </span>
                <span className="pl-6 text-amber-400 transition duration-200 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                  Blog →
                </span>
              </Link>
            </div>
          </div>
          <div className="my-2 grid items-start gap-8">
            <div className="group relative">
              <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-500 opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
              <Link
                href="https://www.youtube.com/channel/UC2hMWOaOlk9vrkvFVaGmn0Q"
                className="relative flex items-center justify-between divide-x divide-gray-600 rounded-lg bg-white px-7 py-4 leading-none dark:bg-black"
              >
                <span className="flex items-center space-x-5">
                  <img
                    src="/static/images/youtube.svg"
                    alt="youtube svg"
                    className="h-6 w-6 -rotate-6"
                  />
                  <span className="pr-6 text-gray-900 dark:text-gray-100">
                    分享不同軟件的教學，把我的技巧分享給大家。
                  </span>
                </span>
                <span className="pl-6 text-indigo-400 transition duration-200 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                  YouTube →
                </span>
              </Link>
            </div>
          </div>
          <div className="my-2 grid items-start gap-8">
            <div className="group relative">
              <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-600 to-primary-600 opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
              <Link
                href="/projects"
                className="relative flex items-center justify-between divide-x divide-gray-600 rounded-lg bg-white px-7 py-4 leading-none dark:bg-black"
              >
                <span className="flex items-center space-x-5">
                  <img
                    src="/static/images/earth.svg"
                    alt="Website svg"
                    className="h-6 w-6 -rotate-6"
                  />
                  <span className="pr-6 text-gray-900 dark:text-gray-100">
                    我不斷嘗試開發不同類型的網站
                  </span>
                </span>
                <span className="pl-6 text-primary-400 transition duration-200 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                  Projects →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
