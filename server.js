const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const router = require('koa-router')()
const app = new Koa()
const port = 3000
const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
let webpackConfig = require('./webpack.config.js')
router.get(['/','/user'],async ctx => {
	await send(ctx,'./src/index.html')
})


app.use(webpackDevMiddleware(webpack(webpackConfig),{
	stats:{
		colors:true
	}
}))
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port)

console.log('server run at ' + port)