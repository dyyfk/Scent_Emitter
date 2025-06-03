/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  output: 'export',
  basePath: '/Scent_Emitter',
  assetPrefix: '/Scent_Emitter/',
  trailingSlash: true,
};

module.exports = nextConfig; 