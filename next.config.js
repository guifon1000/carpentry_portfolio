const { i18n } = require('./next-i18next.config');

module.exports = {
  distDir: 'build',
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  i18n
};