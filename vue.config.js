module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://129.211.11.64:801/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

