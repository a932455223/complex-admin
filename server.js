const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const router = require('koa-router')()
const app = new Koa()
const port = 3000
const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
let webpackConfig = require('./webpack.config.js')

app.use((ctx,next) => {
	if(ctx.method === 'GET' && ['/','/login','/customer/my','/branches','/customer/focus'].includes(ctx.path)){
		ctx.path = '/'
	}
	next();
})

app.use(webpackDevMiddleware(webpack(webpackConfig),{
	stats:{
		colors:true
	}
}))

router.get('/',ctx => {
		ctx.body = ctx.webpack.fileSystem.readFileSync('./dist/index.html')
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port)

console.log('server run at ' + port)