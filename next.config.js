import { withPayload } from '@payloadcms/next/withPayload'
import path from 'node:path'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const MEDIA_PUBLIC_URLS = [process.env.R2_PUBLIC_URL, process.env.PAYLOAD_PUBLIC_SERVER_URL].filter(
  Boolean,
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  transpilePackages: [
    'payload',
    '@payloadcms/next',
    '@payloadcms/ui',
    '@payloadcms/plugin-seo',
    '@payloadcms/plugin-ecommerce',
    '@payloadcms/plugin-form-builder',
    '@payloadcms/richtext-lexical',
    '@payloadcms/storage-s3',
  ],
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      ...MEDIA_PUBLIC_URLS.map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
          pathname: '/**',
        }
      }),
    ],
  },
  reactStrictMode: true,
  redirects,
  turbopack: {
    // Turbopack does not read `webpack.resolve.extensionAlias`.
    // This at least keeps extension resolution predictable when running `next dev --turbo`.
    // Make sure to include the defaults.
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mts', '.mjs', '.cts', '.cjs', '.json'],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig)
