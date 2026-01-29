import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import type { Media as MediaType } from '@/payload-types'

export type HeroType = 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact'

export type HeroLink = {
  link: Record<string, unknown>
}

export type HeroProps = {
  type?: HeroType | null
  richText?: SerializedEditorState | null
  links?: HeroLink[] | null
  media?: MediaType | string | number | null
}

