var wallabyWebpack = require('wallaby-webpack');
var webpackPostprocessor = wallabyWebpack({
  entryPatterns: [
    'src/wallabyTest.js',
    'src/**/*.spec.js'
  ],

  module: {
    loaders: [
      {test: /\.html$/, loader: 'html-loader'},
      {test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/},
      {test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'null-loader'}
    ]
  }
});

module.exports = function (wallaby) {

  return {
    files: [
      {pattern: 'src/**/*.ts', load: false},
      {pattern: 'src/**/*.d.ts', ignore: true},
      {pattern: 'src/**/*.html', load: false},
      {pattern: 'src/**/*.spec.ts', ignore: true}
    ],

    tests: [
      {pattern: 'src/**/*.spec.ts', load: false}
    ],

    testFramework: 'jasmine',

    env: {
      kind: 'electron'
    },

    postprocessor: webpackPostprocessor,

    setup: function () {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      window.__moduleBundler.loadTests();
    },

    debug: true
  };
};