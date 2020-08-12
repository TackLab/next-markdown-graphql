const getCustomConfig = nextConfig => ({
  documentRoot: './images',
  runExpressServer: false,
  ...nextConfig,
});

module.exports = {
  getCustomConfig,
};
