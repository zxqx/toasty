var istanbul = require('browserify-istanbul');

module.exports = function(config) {
  var configuration = {
    basePath: '',

    frameworks: ['mocha', 'browserify'],

    plugins: [
      'karma-coverage',
      'karma-mocha',
      'karma-browserify',
      'karma-chrome-launcher'
    ],

    files: [
      '../index.js',
      '../lib/*.js',
      '../test/*.js'
    ],

    preprocessors: {
      '../index.js': ['browserify'],
      '../lib/*.js': ['browserify'],
      '../test/*.js': ['browserify']
    },

    browserify: {
      transform: ['brfs', istanbul(
        {
          instrumenterConfig: { embedSource: true }
        }
      )]
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: 'lcov' }
      ]
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false
  };

  config.set(configuration);
};
