const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://i7d106.p.ssafy.io:8080/api',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};