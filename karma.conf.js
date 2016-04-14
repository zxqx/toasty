module.exports = function(config) {
  var configuration = {
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

    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    singleRun: false
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
