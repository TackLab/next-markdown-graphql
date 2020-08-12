const getCustomConfig = nextConfig => ({
  documentRoot: './',
  runExpressServer: false,
  ...nextConfig,
});

module.exports = {
  getCustomConfig,
};
