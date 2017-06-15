const argv = require('yargs').argv
const config = require('config')
const webpackConfig = require('build/webpack.config')
const debug = require('debug')('app:karma')

const paths = config.utils_paths;
const APP_ENTRY_PATHS = [
  'babel-polyfill',
  paths.client('main.js'),
];

debug('Creating configuration.')
const karmaConfig = {
  basePath : '../', // project root in relation to tests/karma.js
  files    : [
    {
      pattern  : `./${config.dir_test}/test-bundler.js`,
      watched  : false,
      served   : true,
      included : true
    }
  ],
  singleRun     : !argv.watch,
  frameworks    : ['mocha', 'chai-sinon'],
  reporters     : ['mocha'],
  preprocessors : {
    [`${config.dir_test}/test-bundler.js`] : ['webpack']
  },
  browsers : ['PhantomJS'],
  webpack  : {
    node: webpackConfig.node,
    entry :  {
      app: APP_ENTRY_PATHS,
      vendor: config.compiler_vendor
    },
    devtool : 'cheap-module-source-map',
    resolve : Object.assign({}, webpackConfig.resolve, {
      alias : Object.assign({}, webpackConfig.resolve.alias, {
        sinon : 'sinon/pkg/sinon.js'
      })
    }),
    plugins : webpackConfig.plugins,
    module  : {
      noParse : [
        /\/sinon\.js/
      ],
      rules : webpackConfig.module.rules.concat([
        {
          test   : /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader : 'imports?define=>false,require=>false'
        }
      ])
    },
    // Enzyme fix, see:
    // https://github.com/airbnb/enzyme/issues/47
    externals : Object.assign({}, webpackConfig.externals, {
      'react/addons'                   : true,
      'react/lib/ExecutionEnvironment' : true,
      'react/lib/ReactContext'         : 'window'
    }),
    sassLoader : webpackConfig.sassLoader
  },
  webpackMiddleware : {
    noInfo : true
  },
  coverageReporter : {
    reporters : config.coverage_reporters
  }
}

if (config.globals.__COVERAGE__) {
  karmaConfig.reporters.push('coverage')
  karmaConfig.webpack.module.rules = karmaConfig.webpack.module.rules.concat({
    enforce: 'pre',
    test    : /\.(js|jsx)$/,
    include : new RegExp(config.dir_client),
    exclude : /node_modules/,
    loader  : 'babel',
    query   : Object.assign({}, config.compiler_babel, {
      plugins : (config.compiler_babel.plugins || []).concat('istanbul')
    })
  })
}

module.exports = (cfg) => cfg.set(karmaConfig)
