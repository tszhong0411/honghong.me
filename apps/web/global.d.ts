import type en from '@tszhong0411/i18n/messages/en.json'

type Messages = typeof en

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- interface is necessary for declaration merging
  interface IntlMessages extends Messages {}
}
