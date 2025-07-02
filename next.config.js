/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  basePath: isProduction ? '/Scent_Emitter' : '',
  assetPrefix: isProduction ? '/Scent_Emitter/' : '',
  trailingSlash: true,
};

module.exports = nextConfig; 