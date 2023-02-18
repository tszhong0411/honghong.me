'use client'

import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandYoutube,
  IconCode,
  IconLink,
  IconMoon,
  IconSun,
} from '@tabler/icons-react'
import {
  Action,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
} from 'kbar'
import React from 'react'
import { toast } from 'react-hot-toast'

import { useTheme } from '@/lib/next-themes'

import Results from './Results'

import { WithChildren } from '@/types'

type KBarProps = WithChildren

const KBar = (props: KBarProps) => {
  const { children } = props
  const { setTheme } = useTheme()

  const actions: Action[] = [
    {
      id: 'copy-link',
      name: '複製連結',
      keywords: '連結',
      section: '主要',
      perform: async () => {
        if (!navigator?.clipboard) {
          toast.error('存取剪貼板被拒絕')
        }

        try {
          await navigator.clipboard.writeText(window.location.href)
          toast.success(
            <div className='flex flex-col'>
              <div>已複製</div>
              <div className='text-sm text-accent-5'>
                你現在可以分享給任何人
              </div>
            </div>
          )
        } catch {
          toast.error('複製失敗！')
        }
      },
      icon: <IconLink />,
    },

    {
      id: 'source-code',
      name: '原始碼',
      keywords: '原始碼 程式碼 github',
      section: '主要',
      perform: () =>
        window.open('https://github.com/tszhong0411/honghong.me', '_blank'),
      icon: <IconCode />,
    },
    {
      id: 'light-mode',
      name: '明亮模式',
      keywords: '明亮 模式',
      section: '設置',
      perform: () => setTheme('light'),
      icon: <IconSun />,
    },
    {
      id: 'dark-mode',
      name: '黑暗模式',
      keywords: '黑暗 模式',
      section: '設置',
      perform: () => setTheme('dark'),
      icon: <IconMoon />,
    },
    {
      id: 'github',
      name: 'GitHub',
      keywords: 'github',
      section: '社交',
      perform: () => window.open('https://github.com/tszhong0411', '_blank'),
      icon: <IconBrandGithub />,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      keywords: 'ig instagram',
      section: '社交',
      perform: () =>
        window.open('https://instagram.com/tszhong0411/', '_blank'),
      icon: <IconBrandInstagram />,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      keywords: 'yt youtube',
      section: '社交',
      perform: () => window.open('https://youtube.com/@tszhong0411', '_blank'),
      icon: <IconBrandYoutube />,
    },
    {
      id: 'facebook',
      name: 'Facebook',
      keywords: 'fb facebook',
      section: '社交',
      perform: () =>
        window.open('https://www.facebook.com/tszhonglai.0411/', '_blank'),
      icon: <IconBrandFacebook />,
    },
  ]

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner className='z-50 bg-black/10 backdrop-blur'>
            <KBarAnimator className='w-full max-w-lg rounded-lg border border-accent-2 bg-accent-1'>
              <KBarSearch
                className='w-full bg-transparent py-3 px-6 outline-none'
                defaultPlaceholder='輸入指令或搜尋'
              />
              <Results />
              <div className='h-4'></div>
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        {children}
      </KBarProvider>
    </>
  )
}

export default KBar
