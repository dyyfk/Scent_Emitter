/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dyyfk.github.io',
      },
    ],
  },
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/Scent_Emitter' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Scent_Emitter/' : '',
  trailingSlash: true,
};

module.exports = nextConfig; 