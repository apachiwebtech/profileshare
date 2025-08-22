/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'profileshare.thetalentclub.co.in',
        pathname: '/upload/profile/**',
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
