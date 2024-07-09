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
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: 'via.placeholder.com',
      },
      {
        hostname: 'inventta.sdks.slideworks.cc',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'labi-backend-files-hml.s3.us-east-1.amazonaws.com',
      },
      {
        hostname: 'labi-backend-files-hml.s3.amazonaws.com',
      },
      {
        hostname: 'labi-backend-files-prd.s3.us-east-1.amazonaws.com',
      },
      {
        hostname: '127.0.0.1',
      }
    ],
  },
};

module.exports = nextConfig;
