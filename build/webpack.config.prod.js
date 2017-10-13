/* eslint camelcase: off */
const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const debug = require('debug')('app:webpack:config')

const paths = config.utils_paths;
const { __DEV__, __PROD__, __TEST__ } = config.globals;

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

debug(`Create configuration: ${config.app_root}`);

// -------------------------------------------------------------------
// Entry Points
// -------------------------------------------------------------------

const APP_ENTRY_PATHS = [
    'babel-polyfill',
    paths.client('main.prod.js'),
];


const appModulePaths = [
    paths.client(),
    config.app_root,
    `${config.app_root}/config`,
    // `${config.app_root}/tests`,
    // `${config.app_root}/server`,
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
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat',
        },
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
var CompressionPlugin = require('compression-webpack-plugin');
webpackConfig.plugins = [
    new webpack.IgnorePlugin(/jsdom$/),
    new webpack.DefinePlugin(config.globals),
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
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),

    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    })

];

debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).');
webpackConfig.plugins.push(
    new BundleAnalyzerPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        ie8: false,
        compress: {
            unused: true,
            dead_code: true,
            warnings: false,
        },
        output: {
            comments: false,
        },

    })
);


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
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' }
    ],
});

webpackConfig.module.rules.push({
    test: /\.css$/,
    loaders: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }
    ],
});

// -------------------------------------------------------------------
// Style Configuration
// -------------------------------------------------------------------

// File loaders
/* eslint-disable */
webpackConfig.module.rules.push(
    {
        test: /\.woff(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].\
    [ext]&limit=10000&mimetype=application/font-woff' },

    {
        test: /\.woff2(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].\
    [ext]&limit=10000&mimetype=application/font-woff2' },

    {
        test: /\.otf(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].\
    [ext]&limit=10000&mimetype=font/opentype' },

    {
        test: /\.ttf(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].\
    [ext]&limit=10000&mimetype=application/octet-stream' },

    {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
    },

    {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].\
    [ext]&limit=10000&mimetype=image/svg+xml' },

    // { test: /\.(png|jpg)$/,    loader: 'file-loader?limit=298192' }
    { test: /\.(png|jpg)$/, loader: 'base64-image-loader' }
)
/* eslint-enable */


module.exports = webpackConfig;
