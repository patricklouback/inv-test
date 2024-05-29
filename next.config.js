/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: false
      }
    ]
  },
  images: {
    domains: [
      'via.placeholder.com',
      'localhost',
      'inventta.sdks.slideworks.cc',
    ]
  }
}

module.exports = nextConfig
