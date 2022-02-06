import ToolLayout from '@/layouts/ToolLayout'
import QRious from 'qrious'
import { Snackbar } from '@/components/Snackbar'
import { useEffect, useRef, useState } from 'react'

export default function QrCodeGenerator() {
  const [checked, setChecked] = useState(false)
  const textRef = useRef()

  useEffect(() => {
    new QRious({
      size: 250,
      value: 'https://honghong.me',
      element: document.querySelector('#qr-code-img'),
    })
  }, [])

  const realTimeUpdate = () => {
    new QRious({
      size: 250,
      value: textRef.current.value,
      element: document.querySelector('#qr-code-img'),
    })
  }

  const generateHandler = () => {
    if (textRef.current.value === '') {
      Snackbar('請輸入文字或網址', 'error')
    } else {
      new QRious({
        size: 250,
        value: textRef.current.value,
        element: document.querySelector('#qr-code-img'),
      })
    }
  }

  const downloadHandler = () => {
    var a = document.createElement('a')
    a.href = document.querySelector('#qr-code-img').getAttribute('src')
    a.download = 'QR Code.png'
    a.click()
  }

  return (
    <ToolLayout title={'QR 碼生成器'}>
      <div>
        <div className="mx-auto w-full max-w-[250px]">
          <img alt="qr-code" id="qr-code-img" />
        </div>
        <div>
          <div className="my-4 grid gap-y-3">
            <label htmlFor="text" className="text-lg font-bold">
              網址 / 文字
            </label>
            <input
              type="text"
              id="text"
              className="w-full rounded-md border-red-400 px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
              ref={textRef}
              onChange={() => (checked ? realTimeUpdate() : null)}
            />
          </div>
          <div className="my-4 grid">
            <span className="text-lg font-bold">選項</span>
            <label className="flex items-center">
              <input type="checkbox" onChange={() => setChecked(!checked)} />
              <span className="ml-2 font-bold">即時更新</span>
            </label>
          </div>
          <div className="my-4 grid gap-y-4">
            <button
              type="button"
              className="w-full rounded-md bg-red-500 py-2 px-4 text-lg font-bold text-white"
              onClick={generateHandler}
            >
              生成
            </button>
            <button
              type="button"
              className="w-full rounded-md bg-red-500 py-2 px-4 text-lg font-bold text-white"
              onClick={downloadHandler}
            >
              下載
            </button>
          </div>
        </div>
        <p className="my-4 text-sm">
          如 ios 用戶下載時顯示 <code>document</code>，而不是 <code>QR Code.png</code>，請嘗試使用
          Safari 下載
        </p>
      </div>
    </ToolLayout>
  )
}
