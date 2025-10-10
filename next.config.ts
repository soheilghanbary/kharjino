import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    LIARA_SECRET_KEY: process.env.LIARA_SECRET_KEY,
    LIARA_ACCESS_KEY: process.env.LIARA_ACCESS_KEY,
    LIARA_ENDPOINT: process.env.LIARA_ENDPOINT,
    LIARA_BUCKET_NAME: process.env.LIARA_BUCKET_NAME,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'jobo.storage.c2.liara.space',
      },
    ],
  },
}

export default nextConfig
