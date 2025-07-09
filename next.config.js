/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  optimizeFonts: false,
  experimental: {
    optimizeCss: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
