let HtmlWebpackPlugin = require('html-webpack-plugin')
let path = require('path')

module.exports = {
	entry:{
		main:'./src/index.js'
	},
	output:{
		path:path.resolve(__dirname,'./dist'),
		filename:'[name].[chunkhash].js',
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
			test:/\.css/,
			use:[{
				loader:'style-loader'
			},{
				loader:'css-loader'
			}]
		}
		]
	},
	plugins:[new HtmlWebpackPlugin({
		template:'./src/index.ftl'
	})]
}