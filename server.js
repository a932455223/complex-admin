const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const sqlite3 = require('co-sqlite3')
const router = require('koa-router')()
const logger = require('koa-logger')
const _ = require('lodash')
const app = new Koa()
const port = 3000
const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
let webpackConfig = require('./webpack.config.js')
app.use(logger())

const filterMapping = {
	customer:[1,2,3]
}

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

app.use(async (ctx,next) => {
	ctx.db = await sqlite3('./src/DataBase/crm.db')
	await next()
})

router.get('/',ctx => {
		ctx.body = ctx.webpack.fileSystem.readFileSync('./dist/index.html')
})

// sqlite3('./src/DataBase/crm.db').then((db)=>{
// 	return db.prepare('insert into user(username,password,createTime) values(?,?,?)',['tom','123456',Date().toString()])
// }).then((stmt)=>{
// 	stmt.run();
// 	console.log('data insert sucess')
// })
router.get('/filter/:type',async (ctx) => {
	let type = ctx.params.type
	let dictionaries = await ctx.db.all("select * from dictionary where type like 'customer%';")
	let data = {[type]:[]}
	let indexMap = {}
	let count = 0
	for(let dict of dictionaries){
		let key = dict.type.split('_')[1]
		if(!(key in indexMap)){
			indexMap[key] = count++
		}
		if(!data[type][indexMap[key]]){
			data[type][indexMap[key]] = {
				filterText:dict.typeName,
				paramName:_.camelCase(dict.type),
				options:[{id:dict.id,text:dict.text}]
			}
		}else{
			data[type][indexMap[key]].options.push({
				id:dict.id,
				text:dict.text
			})
		}
	}
	ctx.body = data
})

router.get('/user',async (ctx,next) => {
	let data = await ctx.db.all('select * from user;')
	ctx.body = data
})
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port)

console.log('server run at ' + port)
