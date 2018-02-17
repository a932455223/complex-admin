const HtmlWebpackPlugin = require('html-webpack-plugin')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
const autoprefix = new LessPluginAutoPrefix({browsers:["last 2 versions"]})
const path = require('path')
const webpack = require('webpack');

module.exports = {
	entry:{
		main:'./src/index.js'
	},
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
					presets:['babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-0']
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
	new webpack.HotModuleReplacementPlugin()
]
}
