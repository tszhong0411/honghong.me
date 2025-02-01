'use client'

import { SiFacebook, SiGithub, SiInstagram, SiX, SiYoutube } from '@icons-pack/react-simple-icons'
import { useTranslations } from '@tszhong0411/i18n/client'
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandFooterTrigger,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Kbd,
  Logo
} from '@tszhong0411/ui'
import { useSetAtom } from 'jotai'
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
import { dialogsAtom } from '@/store/dialogs'

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
  const [selectingValue, setSelectingValue] = useState('')
  const [copy] = useCopyToClipboard()
  const { status } = useSession()
  const t = useTranslations()
  const setDialogs = useSetAtom(dialogsAtom)

  const isSelectingCommand = [t('common.sign-out'), t('command-menu.actions.copy-link')].includes(
    selectingValue
  )

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
                title: t('common.sign-out'),
                icon: <LogOutIcon className='mr-3 size-4' />,
                onSelect: () => signOut()
              }
            ]
          : [
              {
                title: t('common.sign-in'),
                icon: <LogInIcon className='mr-3 size-4' />,
                onSelect: () => {
                  setIsOpen(false)
                  setDialogs((dialogs) => ({ ...dialogs, signIn: true }))
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
        aria-label={t('command-menu.open-menu')}
      >
        <CommandIcon className='size-4' />
      </Button>
      <CommandDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        value={selectingValue}
        onValueChange={setSelectingValue}
      >
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
        <CommandFooter>
          <Logo className='size-4' />
          <CommandFooterTrigger triggerKey={<Kbd keys={['enter']} className='py-0' />}>
            {isSelectingCommand
              ? t('command-menu.trigger.open-command')
              : t('command-menu.trigger.open-link')}
          </CommandFooterTrigger>
        </CommandFooter>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
