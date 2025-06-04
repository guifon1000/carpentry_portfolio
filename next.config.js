/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

// For static export, we need to disable the i18n configuration
// but keep it available for development and server-side rendering
const config = {
  reactStrictMode: true,
  typescript: {
    // Skip type checking during build for faster builds
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip linting during build for faster builds
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  webpack: (config, { isServer, dev }) => {
    // Add optimization for WSL environment
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay before rebuilding
      };
    }
    return config;
  },
};

// Only include i18n config when not exporting static files
if (process.env.EXPORT !== 'true') {
  config.i18n = i18n;
}

// For static export
if (process.env.EXPORT === 'true') {
  config.output = 'export';
}

module.exports = config;