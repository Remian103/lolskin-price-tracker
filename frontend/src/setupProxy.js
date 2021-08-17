const { createProxyMiddleware } = require("http-proxy-middleware");

// restart app when modified
module.exports = function(app) {
    app.use(
        createProxyMiddleware('/fastapi', {
            target: 'http://3.38.87.112:8000',
            changeOrigin: true,
            pathRewrite: {
                '^/fastapi': '' // URL ^/fastapi -> 공백 변경
            }
        })
    );
};