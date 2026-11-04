import type { NextConfig } from 'next'

const output = process.env.NEXT_OUTPUT
if (output && output !== 'export') {
  throw new Error('NEXT_OUTPUT must be unset (server) or "export" (static).')
}

const nextConfig: NextConfig = {
  ...(output === 'export' ? { output: 'export' } : {}),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
  images: { unoptimized: output === 'export' },
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
