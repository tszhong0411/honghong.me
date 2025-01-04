'use client'

import { SiFacebook, SiGithub, SiInstagram, SiX, SiYoutube } from '@icons-pack/react-simple-icons'
import { useTranslations } from '@tszhong0411/i18n/client'
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@tszhong0411/ui'
import { CodeIcon, CommandIcon, LinkIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_X_URL,
  SITE_YOUTUBE_URL
} from '@/lib/constants'
import { setDialogs } from '@/store/dialogs'

type Groups = Array<{
  name: string
  actions: Array<{
    title: string
    icon: React.ReactNode
    onSelect: () => void | Promise<void>
  }>
}>

const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [copy] = useCopyToClipboard()
  const { status } = useSession()
  const t = useTranslations()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((value) => !value)
      }
    }

    document.addEventListener('keydown', down)

    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [])

  const openLink = useCallback((url: string) => {
    setIsOpen(false)
    window.open(url, '_blank', 'noopener')
  }, [])

  const groups: Groups = [
    {
      name: t('command-menu.groups.account'),
      actions: [
        ...(status === 'authenticated'
          ? [
              {
                title: t('command-menu.actions.sign-out'),
                icon: <LogOutIcon className='mr-3 size-4' />,
                onSelect: () => signOut()
              }
            ]
          : [
              {
                title: t('command-menu.actions.sign-in'),
                icon: <LogInIcon className='mr-3 size-4' />,
                onSelect: () => {
                  setIsOpen(false)
                  setDialogs({ signIn: true })
                }
              }
            ])
      ]
    },
    {
      name: t('command-menu.groups.general'),
      actions: [
        {
          title: t('command-menu.actions.copy-link'),
          icon: <LinkIcon className='mr-3 size-4' />,
          onSelect: async () => {
            setIsOpen(false)

            await copy({ text: globalThis.location.href })
          }
        },
        {
          title: t('command-menu.actions.source-code'),
          icon: <CodeIcon className='mr-3 size-4' />,
          onSelect: () => {
            openLink('https://github.com/tszhong0411/honghong.me')
          }
        }
      ]
    },
    {
      name: t('command-menu.groups.social'),
      actions: [
        {
          title: 'GitHub',
          icon: <SiGithub className='mr-3 size-4' />,
          onSelect: () => {
            openLink(SITE_GITHUB_URL)
          }
        },
        {
          title: 'Facebook',
          icon: <SiFacebook className='mr-3 size-4' />,
          onSelect: () => {
            openLink(SITE_FACEBOOK_URL)
          }
        },
        {
          title: 'Instagram',
          icon: <SiInstagram className='mr-3 size-4' />,
          onSelect: () => {
            openLink(SITE_INSTAGRAM_URL)
          }
        },
        {
          title: 'X',
          icon: <SiX className='mr-3 size-4' />,
          onSelect: () => {
            openLink(SITE_X_URL)
          }
        },
        {
          title: 'YouTube',
          icon: <SiYoutube className='mr-3 size-4' />,
          onSelect: () => {
            openLink(SITE_YOUTUBE_URL)
          }
        }
      ]
    }
  ]

  return (
    <>
      <Button
        variant='ghost'
        className='size-9 p-0'
        onClick={() => {
          setIsOpen(true)
        }}
        type='button'
        aria-label={t('command-menu.open-menu')}
      >
        <span className='sr-only'>{t('command-menu.open-menu')}</span>
        <CommandIcon className='size-4' />
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder={t('command-menu.placeholder')} />
        <CommandList>
          <CommandEmpty>{t('command-menu.no-results')}</CommandEmpty>
          {groups.map((group, i) => (
            <Fragment key={group.name}>
              <CommandGroup heading={group.name}>
                {group.actions.map((action) => (
                  <CommandItem key={action.title} onSelect={action.onSelect}>
                    {action.icon}
                    {action.title}
                  </CommandItem>
                ))}
              </CommandGroup>
              {i === groups.length - 1 ? null : <CommandSeparator />}
            </Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
