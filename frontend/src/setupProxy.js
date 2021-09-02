const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require('./config.json');

// restart app when modified
module.exports = function(app) {
    app.use(
        createProxyMiddleware("/api", {
            target: config.proxy.backendAPI,
            changeOrigin: true,
            /*
            pathRewrite: {
                "^/api": "" // URL ^/fastapi -> 공백 변경
            }
            */
        })
    );
};