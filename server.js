const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const sqlite3 = require('co-sqlite3')
const router = require('koa-router')()
const logger = require('koa-logger')
const app = new Koa()
const port = 3000
const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
let webpackConfig = require('./webpack.config.js')
app.use(logger())
app.use(async (ctx,next) => {
	if(ctx.method === 'GET' && ['/','/login','/customer/my','/branch/list','/customer/focus'].includes(ctx.path)){
		ctx.path = '/'
	}
	await next();
})

app.use(webpackDevMiddleware(webpack(webpackConfig),{
	stats:{
		colors:true
	}
}))

router.get('/',ctx => {
		ctx.body = ctx.webpack.fileSystem.readFileSync('./dist/index.html')
})

// sqlite3('./src/DataBase/crm.db').then((db)=>{
// 	return db.prepare('insert into user(username,password,createTime) values(?,?,?)',['tom','123456',Date().toString()])
// }).then((stmt)=>{
// 	stmt.run();
// 	console.log('data insert sucess')
// })

router.get('/user',async (ctx,next) => {
	const db = await sqlite3('./src/DataBase/crm.db');
	let data = await db.all('select * from user;')
	ctx.body = data
})
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port)

console.log('server run at ' + port)
