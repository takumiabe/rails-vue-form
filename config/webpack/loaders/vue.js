const { dev_server: devServer, extract_css: extractCSS } = require('@rails/webpacker').config

module.exports = {
  test: /\.vue(\.erb)?$/,
  use: [{
    loader: 'vue-loader',
    options: { extractCSS }
  }]
}
