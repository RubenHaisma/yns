/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./i18n.ts');

const nextConfig = withNextIntl({
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  }
});

module.exports = nextConfig;