module.exports = function(config) {
  var configuration = {
    basePath: '',

    frameworks: ['mocha', 'browserify'],

    files: [
      'index.js',
      'lib/*.js',
      'test/*.js'
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

    browsers: ['Chrome'],

    singleRun: false
  };

  config.set(configuration);
};
