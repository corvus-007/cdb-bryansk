const webpack = require('webpack'); //to access built-in plugins

// в консоли `NODE_ENV=production gulp assets`
const isDevelopment =
  // eslint-disable-next-line no-undef
  !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  output: {
    filename: 'script.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};
