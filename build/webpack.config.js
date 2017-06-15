/* eslint camelcase: off */
const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const debug = require('debug')('app:webpack:config')

const paths = config.utils_paths;
const {__DEV__, __PROD__, __TEST__} = config.globals;

debug(`Create configuration: ${config.app_root}`);

// -------------------------------------------------------------------
// Entry Points
// -------------------------------------------------------------------
const APP_ENTRY_PATHS = [
  'react-hot-loader/patch',
  'babel-polyfill',
  paths.client('main.js'),
];

const appModulePaths = [
  paths.client(),
  config.app_root,
  `${config.app_root}/config`,
  `${config.app_root}/tests`,
  `${config.app_root}/server`,
  `${config.app_root}/src`,
  `${config.app_root}/node_modules`,
];

debug('appModulePaths', appModulePaths[0]);
// -------------------------------------------------------------------
// Webpack Configuration module
// -------------------------------------------------------------------
const webpackConfig = {
  name: 'client',
  target: 'web',
  module: { rules: [] },

  resolve: {
    modules: appModulePaths,
    extensions: ['.js', '.jsx', '.json'],
  },
};

if (__DEV__) {
  webpackConfig.devtool = config.compiler_devtool;
}

webpackConfig.entry = {
  app: __DEV__
    ? APP_ENTRY_PATHS.concat(
      `webpack-hot-middleware/client?path=
      ${config.compiler_public_path}__webpack_hmr`)
    : APP_ENTRY_PATHS,

  vendor: config.compiler_vendor,
};

webpackConfig.node = {
  'strip-bom': 'empty',
  child_process: 'empty',
  net: 'empty',
  tls: 'empty',
  fs: 'empty',
  browser: 'empty',
};

// -------------------------------------------------------------------
// Bundle Output
// -------------------------------------------------------------------
webpackConfig.output = {
  filename: `[name].[${config.compiler_hash_type}].js`,
  path: paths.dist(),
  publicPath: config.compiler_public_path,
};

// -------------------------------------------------------------------
// Plugins
// -------------------------------------------------------------------
webpackConfig.plugins = [
  new webpack.IgnorePlugin(/jsdom$/),
  new webpack.DefinePlugin(config.globals),
  new webpack.ProvidePlugin({
    'React': 'react',
    '_': 'lodash',
  }),
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true,
    },
  }),
];

const DISABLE_ALL_PLUGINS = false

if (DISABLE_ALL_PLUGINS) {
  // yup

} else if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).');
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );

} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).');
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    })
  );
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
    })
  );
}

// -------------------------------------------------------------------
// Webpack Rules
// -------------------------------------------------------------------
// JavaScript / JSON
webpackConfig.module.rules = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    cacheDirectory: true,
    plugins: [
      'transform-decorators-legacy',
      'transform-runtime',
      'transform-es3-property-literals',
      'transform-es3-member-expression-literals',
      'react-hot-loader/babel'
    ],
    presets: ['es2015', 'react', 'stage-0'],
    env: {
      production: {
        presets: ['react-optimize'],
      },

      "development": {
        "plugins": []
      }

    },
  },
},
{
  test: /\.json$/,
  loader: 'json-loader',
}];

// -------------------------------------------------------------------
// Style Loaders
// -------------------------------------------------------------------

// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css-loader?sourceMap&-minimize';

// Add any packge names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
const PATHS_TO_TREAT_AS_CSS_MODULES = [
  // 'cssm', 'layouts', 'components'
];

if (config.compiler_css_modules) {
  PATHS_TO_TREAT_AS_CSS_MODULES.push(
    paths.client().replace(
      /[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&')
  );
}

const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length;
const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`);

// Loaders for files that should not be treated as CSS modules.
const excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false;
// const postCssOptions = {
    // plugins: [cssnano({
    // autoprefixer: {
      // add: true,
      // remove: true,
      // browsers: ['last 2 versions'],
    // },

    // discardComments: {
      // removeAll: true,
    // },

    // discardUnused: false,
    // mergeIdents: false,
    // reduceIdents: false,
    // safe: true,
    // sourcemap: true,
  // })]
// }

// const autoprefixer = require('autoprefixer');
// const postCssOptions = [
  // autoprefixer({
    // cascade : false,
    // browser : ['Chrome >= 49', 'Firefox >= 49', 'Edge >= 13']
  // })
// ]

// console.log('postCss options', postCssOptions);

const postCssLoader = {
  loader: 'postcss-loader',
  // options: { postcss: postCssOptions }
};

const baseCssLoader = {
  loader: 'css-loader'
}

const sassLoader = {
  loader: 'sass-loader',
  // options: {
    // includePaths: paths.client('styles')
  // }
}

webpackConfig.module.rules.push({
  test: /\.scss$/,
  loaders: [
    'style-loader',
    BASE_CSS_LOADER,
    postCssLoader,
    sassLoader
  ],
});

webpackConfig.module.rules.push({
  test: /\.css$/,
  loaders: [
    'style-loader',
    BASE_CSS_LOADER,
    postCssLoader
  ],
});

// -------------------------------------------------------------------
// Style Configuration
// -------------------------------------------------------------------

// File loaders
/* eslint-disable */
webpackConfig.module.rules.push(
  { test: /\.woff(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].\
    [ext]&limit=10000&mimetype=application/font-woff' },

  { test: /\.woff2(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].\
    [ext]&limit=10000&mimetype=application/font-woff2' },

  { test: /\.otf(\?.*)?$/,   loader: 'file-loader?prefix=fonts/&name=[path][name].\
    [ext]&limit=10000&mimetype=font/opentype' },

  { test: /\.ttf(\?.*)?$/,   loader: 'url-loader?prefix=fonts/&name=[path][name].\
    [ext]&limit=10000&mimetype=application/octet-stream' },

  { test: /\.eot(\?.*)?$/,
    loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },

  { test: /\.svg(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].\
    [ext]&limit=10000&mimetype=image/svg+xml' },

  { test: /\.(png|jpg)$/,    loader: 'url-loader?limit=8192' }
)
/* eslint-enable */

// -------------------------------------------------------------------
// Finalize Configuration
// -------------------------------------------------------------------
// if (!__DEV__) {
  // debug('Apply ExtractTextPlugin to CSS loaders.');

  // webpackConfig.module.rules.filter((loader) =>
    // loader.loaders && loader.loaders.find(
      // (name) => /css/.test(name.split('?')[0]))
  // ).forEach((loader) => {
    // const [first, ...rest] = loader.loaders;
    // loader.loader = ExtractTextPlugin.extract({
      // fallbackLoader: first, loader: rest.join('!')});
    // Reflect.deleteProperty(loader, 'loaders');
  // });

  // webpackConfig.plugins.push(
    // new ExtractTextPlugin({
      // filename: '[name].[contenthash].css', allChunks: true})
  // );
// }

module.exports = webpackConfig;
