const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Proxy endpoint
    createProxyMiddleware({
      target: 'http://127.0.0.1:8080', // Backend server URL
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // Remove `/api` from the path
    })
  );
};
