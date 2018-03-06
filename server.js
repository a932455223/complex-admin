const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const sqlite3 = require('co-sqlite3')
const router = require('koa-router')()
const logger = require('koa-logger')
const bodyParse = require('koa-bodyparser')
const webpackHotMiddleware = require('webpack-hot-middleware')
const _ = require('lodash')
const app = new Koa()
const port = 3000
const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const middleware = require('koa-webpack')
let webpackConfig = require('./webpack.config.js')
app.use(logger())
app.use(bodyParse())

const filterMapping = {
	customer:[1,2,3]
}


app.use(async (ctx,next) => {
	if(ctx.method === 'GET' && ['/','/login','/customer/my','/branch/list','/customer/focus'].includes(ctx.path)){
		ctx.path = '/'
	}
	await next();
})

const compiler = webpack(webpackConfig)
// app.use(webpackDevMiddleware(compiler,{
// 	hot:true,
// 	historyApiFallback: true,
// 	stats:{
// 		colors:true
// 	}
// }))
//
// app.use(webpackHotMiddleware(compiler))

app.use(middleware(compiler,{publicPath:'/'}))

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

router.post('/customer',async (ctx,next)=>{
	let data = ctx.request.body
	if(data.name.trim() === ''){
		ctx.body = {
			code:500,
			message:'客户姓名不能为空',
			data:{}
		}
	}else{
		let cmd = await ctx.db.prepare('insert into customer(name) values(?)',[data.name])
		cmd.run()
		ctx.body = {
			code:200,
			message:'success',
			data:{}
		}
	}

	await next()
})

router.get('/user',async (ctx,next) => {
	let data = await ctx.db.all('select * from user;')
	ctx.body = data
	await next()
})

router.get('/customers',async (ctx,next)=>{
	let data = await ctx.db.all('select * from customer')
	ctx.body = data
	await next()

})

router.put('/customer/:id',async (ctx,next)=>{
	let data = ctx.request.body
	let sqlStatement = []
	for(let key of Object.keys(data)){
		sqlStatement.push(`${key}=?`)
	}
	let cmd = await ctx.db.prepare(`update customer set ${sqlStatement.join(',')} where id=?`,[...Object.values(data),parseInt(ctx.params.id)])
	cmd.run()
	ctx.body = {
		code:200,
		message:'success',
		data:{}
	}
	await next()
})

router.put('/family/:id',async (ctx,next)=>{
	let params = ctx.request.body
	let sqlStatement = []
	for(let key of Object.keys(params)){
		sqlStatement.push(`${key}=?`)
	}
	let cmd = await ctx.db.prepare(`update customerRelative set ${sqlStatement.join(',')} where id=?`,[...Object.values(params),parseInt(ctx.params.id)])
	cmd.run()
	ctx.body = {
		code:200,
		message:'success',
		data:{}
	}
	await next()
})

router.get('/customer/:id/faminlyInfo',async (ctx,next)=>{
	let data = await ctx.db.all(`select * from customerRelative where customerId = ?`,[ctx.params.id])
	ctx.body = {
		code:200,
		message:'success',
		data:data
	}

	await next()
})

router.post('/faminlyInfo',async (ctx,next) => {
	let params = ctx.request.body
	let keys = Object.keys(params)
	let cmd = await ctx.db.prepare(`insert into customerRelative(${keys.join(',')}) values(${new Array(keys.length).fill('?')})`,Object.values(params))
	cmd.run()
	ctx.body = {
		code:200,
		message:'success',
		data:{}
	}
	await next()
})
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port)

console.log('server run at ' + port)
