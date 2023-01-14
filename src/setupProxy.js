// Work around for Proxy issue with latest webpackDevServer issue.
// From https://github.com/facebook/create-react-app/issues/11762
// For more information read the page. S. Sigman 1/17/2022
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};