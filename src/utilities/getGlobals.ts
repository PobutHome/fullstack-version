import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import type { AppLocale } from '@/utilities/locale'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, depth = 0, locale?: AppLocale) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    ...(locale ? { locale } : {}),
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0, locale?: AppLocale) =>
  unstable_cache(async () => getGlobal<T>(slug, depth, locale), [slug, locale ?? ''], {
    tags: [`global_${slug}_${locale ?? 'default'}`],
  })
