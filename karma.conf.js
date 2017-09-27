let webpackTestConfigs = require('./webpack.test.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    
    frameworks: ['jasmine'],
    
    exclude: [],
    
    files: [{pattern: './karma-test-shim.js', watched: false}],
    
    preprocessors: {'./karma-test-shim.js': ['webpack', 'sourcemap']},
    
    webpack: webpackTestConfigs,

    webpackMiddleware: {stats: 'errors-only'},

    reporters: ['mocha'],

    mochaReporter: {
      ignoreSkipped: true
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: [
      'PhantomJS'
    ],

    singleRun: true
  });
};
