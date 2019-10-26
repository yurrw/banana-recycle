import webpack from 'webpack';
import cssnano from 'cssnano';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from '../config';
import _debug from 'debug';

const debug = _debug('app:webpack:config');
const paths = config.utils_paths;
const {__DEV__, __PROD__, __TEST__} = config.globals;

const APP_ENTRY_PATH = paths.base(config.dir_client) + '/main.js';

// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css-loader?sourceMap&-minimize';

// Add any packge names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
const PATHS_TO_TREAT_AS_CSS_MODULES = [ /* 'react-toolbox', (example)*/ ];

//process.traceDeprecation = true;

// Main Configuration
debug('Create configuration.');
const webpackConfig = {
	name: 'client',
	target: 'web',
	//devtool: 'config.compiler_devtool',
	devtool: 'source-map',
	entry: {
		app: __DEV__ 	? [APP_ENTRY_PATH, `webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`]
						: [APP_ENTRY_PATH],
		vendor: config.compiler_vendor
	},
	output: {
		filename: `[name].[${config.compiler_hash_type}].js`,
		path: paths.base(config.dir_dist),
		publicPath: config.compiler_public_path
	},
	resolve: {
		modules: [
			paths.base(config.dir_client),
			"node_modules"
		],
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				enforce: "pre",
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					cacheDirectory: true,
					plugins: ['transform-runtime'],
					presets: ['es2015', 'react', 'stage-0'],
					env: {
						development: {
							plugins: [
								['react-transform',
									{
										transforms: [{
											transform: 'react-transform-hmr',
											imports: ['react'],
											locals: ['module']
										},
										{
											transform: 'react-transform-catch-errors',
											imports: ['react', 'redbox-react']
										}]
									}
								]
							]
						},
						production: {
							plugins: [
								'transform-react-remove-prop-types',
								'transform-react-constant-elements'
							]
						}
					}
				}
			}
		]

	},
	plugins: [
		new webpack.DefinePlugin(config.globals),
		new HtmlWebpackPlugin({
			template: paths.client('index.html'),
			hash: false,
			favicon: paths.client('static/favicon.ico'),
			filename: 'index.html',
			inject: 'body',
			minify: {
				collapseWhitespace: true
			}
		}),
		new webpack.LoaderOptionsPlugin({
			cssnano: {
				postcss: {
					autoprefixer: {
						add: true,
						remove: true,
						browsers: ['last 2 versions']
					},
					discardComments: {
						removeAll: true
					},
					safe: true,
					sourcemap: true
				}
			},
			sassLoader: {
				includePaths: paths.client('styles')
			},
			eslint: {
				configFile: paths.base('.eslintrc'),
				emitWarning: __DEV__
			}
		})
	]
};



// Conditioned Configurations, Modules and Plugins
// Warning: DO NOT change the order of the statements below
if (__DEV__) {
	debug('Enable plugins for live development (HMR, NoErrors).');
	webpackConfig.plugins
		.push(	new webpack.HotModuleReplacementPlugin(),
				new webpack.NoEmitOnErrorsPlugin() );

} else if (__PROD__) {
	debug('Enable plugins for production (OccurenceOrder & UglifyJS).');
	webpackConfig.plugins
		.push(	new webpack.optimize.OccurrenceOrderPlugin(),
				new webpack.optimize.UglifyJsPlugin({
					compress: {
						unused: true,
						dead_code: true,
						warnings: false
					}
				}));
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
	webpackConfig.plugins
		.push(new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor']
		}));
}

// If config has CSS modules enabled, treat this project's styles as CSS modules.
if (config.compiler_css_modules) {
	PATHS_TO_TREAT_AS_CSS_MODULES
		.push(paths.base(config.dir_client).replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&'));
}

const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length;
const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`);

// Loaders for styles that need to be treated as CSS modules.
if (isUsingCSSModules) {
	const cssModulesLoader = [
		BASE_CSS_LOADER,
		'modules',
		'importLoaders=1',
		'localIdentName=[name]__[local]___[hash:base64:5]'
	].join('&');

	webpackConfig.module.rules
		.push({
			test: /\.scss$/,
			include: cssModulesRegex,
			loaders: [
				'style-loader',
				cssModulesLoader,
				'postcss-loader',
				'sass-loader?sourceMap'
			]
		});

	webpackConfig.module.rules
		.push({
			test: /\.css$/,
			include: cssModulesRegex,
			loaders: [
				'style-loader',
				cssModulesLoader,
				'postcss-loader'
			]
		});
}

// Loaders for files that should not be treated as CSS modules.
const excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false;

webpackConfig.module.rules
	.push({
		test: /\.scss$/,
		exclude: excludeCSSModules,
		loaders: [
			'style-loader',
			BASE_CSS_LOADER,
			'postcss-loader',
			'sass-loader?sourceMap'
		]
	});

webpackConfig.module.rules
	.push({
		test: /\.css$/,
		exclude: excludeCSSModules,
		loaders: [
			'style-loader',
			BASE_CSS_LOADER,
			'postcss-loader'
		]
	});

// File loaders
/* eslint-disable */
webpackConfig.module.rules.push(
	{ test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
	{ test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
	{ test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
	{ test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
	{ test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
	{ test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
	{ test: /\.(png|jpg)$/,    loader: 'url?limit=8192' },
	{ test: /\.pdf$/,  		   loader: 'url?limit=16384' }
)
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
	debug('Apply ExtractTextPlugin to CSS loaders.');
	webpackConfig.module.rules
		.filter((loader) =>	loader.loaders &&
							loader.loaders.find((name) => /css/.test(name.split('?')[0])))
		.forEach((loader) => {
			const [first, ...rest] = loader.loaders;
			loader.loader = ExtractTextPlugin.extract({
				fallback: first,
				use: rest.join('!')
			});
			delete loader.loaders;
		});

	webpackConfig.plugins
		.push( new ExtractTextPlugin({
			filename: '[name].[contenthash].css',
			allChunks: true
		})
	);
}

export default webpackConfig;