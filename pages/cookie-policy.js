import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'

export default function CookiePolicy() {
  return (
    <>
      <PageSEO
        title={`Cookies 政策 - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Cookie 政策
          </h1>
        </div>
        <div className="prose max-w-full py-12 dark:prose-dark">
          <div>
            <h1>Cookie 政策</h1>
            <p>
              本 cookies 政策適用於 <Link href="https://tszhong.top">tszhong.top</Link> 及
              所有子域名上 cookies 的使用。
            </p>
            <p>
              我們在我們的網站和服務中使用cookies，將您與我們網站和服務的其他用戶區分開來。這有助於我們在您瀏覽我們的網站時為您提供良好的體驗，同時也使我們能夠改進網站和服務。
            </p>
            <h2>什麼是 Cookies?</h2>
            <p>
              Cookies
              是由你訪問的網站放置在你的設備上的小型文字檔案。它們被廣泛使用，以使網站工作，或更有效地工作，以及向網站所有者提供資料。Cookies
              可以是 "persistent " 或 "session" cookies。
            </p>
            <p>我們使用持久性cookies和會話cookies。</p>
            <h2>Persistent Cookies</h2>
            <p>
              Persistent cookie 是瀏覽器 sessions
              之間存儲在用戶的設備上，它可以記住用戶在整個網站（或在某些情況下在不同網站）的偏好或行動。
            </p>
            <h2>Session Cookies</h2>
            <p>
              Session Cookie 允許網站或服務將您在瀏覽器 session 期間的行動連接起來。我們使用 session
              cookies
              來啟用網站或服務的某些功能，以更好地了解您與網站或服務的互動情況，並監測用戶的總體使用情況和網站上的網絡流量路由。與
              persistent cookies 不同的是，當您從網站或服務中退出並關閉瀏覽器時，session cookies
              將從您的設備中刪除。
            </p>
            <h2>我們使用哪些 cookies 以及為什麼 </h2>
            <p>下表解釋了我們使用的 cookies 以及我們使用它們的原因。</p>
            <h3>分析</h3>
            <figure>
              <table className="block w-full table-fixed overflow-x-auto whitespace-nowrap md:table md:whitespace-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="w-1/4 border border-solid border-black bg-gray-100 px-4  py-4 text-black dark:bg-gray-900 dark:text-white"
                    >
                      Cookie
                    </th>
                    <th
                      scope="col"
                      className="w-1/4 border border-solid border-black bg-gray-100 px-4  py-4 text-black dark:bg-gray-900 dark:text-white"
                    >
                      類型
                    </th>
                    <th
                      scope="col"
                      className="w-1/4 border border-solid border-black bg-gray-100 px-4  py-4 text-black dark:bg-gray-900 dark:text-white"
                    >
                      期限
                    </th>
                    <th
                      scope="col"
                      className="w-3/4 border border-solid border-black bg-gray-100 px-4  py-4 text-black dark:bg-gray-900 dark:text-white"
                    >
                      描述
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="break-all border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                      _ga
                    </td>
                    <td className="break-all border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                      https
                    </td>
                    <td className="break-all border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                      2 年
                    </td>
                    <td className="break-all border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                      該 cookie 由 Google Analytics 安裝。Cookie
                      用於計算訪問者、session、活動數據並跟踪網站使用情況以生成網站分析報告。Cookies
                      以匿名方式存儲資料並分配一個隨機生成的編號來識別唯一訪問者。
                    </td>
                  </tr>
                  <tr>
                    <td className="break-all border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                      _gid
                    </td>
                    <td className="break-all border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                      https
                    </td>
                    <td className="break-all border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                      1 天
                    </td>
                    <td className="break-all border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                      該 cookie 由 Google Analytics 安裝。Cookie
                      用於存儲訪問者如何使用網站的資料，並有助於創建網站運行情況的分析報告。收集的數據包括訪問者的數量、他們的來源以及以匿名形式訪問的頁面。
                    </td>
                  </tr>
                  <tr>
                    <td className="break-all border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                      _gat_gtag_UA_185110551_3
                    </td>
                    <td className="break-all border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                      https
                    </td>
                    <td className="break-all border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                      1 分鐘
                    </td>
                    <td className="break-all border border-black bg-gray-100 px-4 py-4 font-medium text-black dark:bg-gray-900 dark:text-white">
                      由 Google 設置以分辨用戶。
                    </td>
                  </tr>
                </tbody>
              </table>
            </figure>
            <h2>如何刪除 cookies?</h2>
            <p>
              由於 cookies 不存儲在我們的系統中，而是存儲在您的本地設備，我們無法檢索或刪除
              cookies。但是，您可以按照以下指南刪除設備上現有的 cookies。
            </p>
            <ul>
              <li>
                <Link href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d#ie=ie-11">
                  Internet Explorer
                </Link>
              </li>
              <li>
                <Link href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored?esab=a&s=cookies&r=3&as=s">
                  Mozilla Firefox
                </Link>
              </li>
              <li>
                <Link href="https://support.google.com/chrome/answer/2392709?hl=en">
                  Google Chrome
                </Link>
              </li>
              <li>
                <Link href="https://support.apple.com/en-us/HT201265">Safari iOS</Link>
              </li>
              <li>
                <Link href="https://help.opera.com/en/latest/web-preferences/#cookies">Opera</Link>
              </li>
            </ul>
            <p className="mx-2 rounded-xl bg-red-500 p-2 text-center text-white">
              最近更新時間: 2022 / 01 / 30
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
