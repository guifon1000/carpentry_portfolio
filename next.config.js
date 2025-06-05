const { i18n } = require('./next-i18next.config');

module.exports = {
  // Remove distDir config to use default .next directory
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  i18n
};