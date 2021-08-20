const { createProxyMiddleware } = require("http-proxy-middleware");
const server = require('./server.json');

// restart app when modified
module.exports = function(app) {
    app.use(
        createProxyMiddleware("/api", {
            target: server.fastapi,
            changeOrigin: true,
            /*
            pathRewrite: {
                "^/api": "" // URL ^/fastapi -> 공백 변경
            }
            */
        })
    );
};