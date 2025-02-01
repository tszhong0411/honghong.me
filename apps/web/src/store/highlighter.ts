import type { HighlighterCore } from 'shiki'

import { atom } from 'jotai'

export const highlighterAtom = atom<HighlighterCore | null>(null)
