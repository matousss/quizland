/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['dummyimage.com']
  },
  output: 'standalone',
}

module.exports = nextConfig
