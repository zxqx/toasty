module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'browserify'],

    files: [
      'index.js',
      'lib/*.js',
      'test/*.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'test/*.js': [ 'browserify' ],
      'lib/*.js': [ 'browserify' ],
      'index.js': [ 'browserify' ]
    },

    browserify: {
      transform: [ 'brfs' ]
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome', 'Chrome_without_security'],

    singleRun: false
  });
};
