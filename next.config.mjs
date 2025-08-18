/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thetalentclub.co.in',
        pathname: '/upload/profile/**',
      },
    ],
  },
};

export default nextConfig;
