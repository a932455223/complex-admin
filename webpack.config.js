const HtmlWebpackPlugin = require('html-webpack-plugin')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
const autoprefix = new LessPluginAutoPrefix({browsers:["last 2 versions"]})
const path = require('path')
const webpack = require('webpack');

module.exports = {
	entry:[ 'webpack-hot-client/client', 'react-hot-loader/patch','./src/index.js'],
	output:{
		publicPath:'/',
		path:path.resolve(__dirname,'./dist'),
		filename:'[name].js',
		chunkFilename:'[name].[chunkhash:8].js'
	},
	resolve:{
		extensions:['.js','.jsx']
	},
	module:{
		rules:[{
			test:/\.jsx?/,
			exclude:/(node_modules|bower_components)/,
			use:[{
				loader:'babel-loader',
				options:{
					presets:[['es2015',{ 'modules': false}], 'react', 'stage-0'],
					plugins: ["react-hot-loader/babel"]
				}
			}]
		},
		{
			test:/\.less/,
			use:[{
				loader:'style-loader'
			},{
				loader:'css-loader'
			},{
				loader:'less-loader',
				options:{
					plugins:[autoprefix]
				}
			}]
		},
		{
			test:/\.css/,
			use:[{
				loader:'style-loader'
			},{
				loader:'css-loader'
			}]
		},{
			test:/\.(png|jpg|jpeg|gif)/,
			use:[{
				loader:'url-loader',
				options:{
					limit:8192
				}
			}]
		}
		]
	},
	plugins:[new HtmlWebpackPlugin({
		template:'./src/index.ftl'
	}),
	new webpack.NamedModulesPlugin()
]
}
