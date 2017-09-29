let webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      './src',
      'node_modules'
    ]
  },

  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      query: {
        allowJs: true,
        sourceMap: false,
        inlineSourceMap: true,
        module: "commonjs",
        removeComments: true
      }
    }]
  },

  plugins: [
    // fix the warning in ./~/@angular/core/src/linker/system_js_ng_module_factory_loader.js
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, './src')
  ],

  performance: {
    hints: false
  }
};
