/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  output: 'export',
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/Scent_Emitter',
    assetPrefix: '/Scent_Emitter/',
  } : {}),
};

module.exports = nextConfig; 