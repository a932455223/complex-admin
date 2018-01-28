import React from 'react'
import ReactDOM from 'react-dom'
import Pages from './routes'
import Main from './Pages/Main'
import Login from './Pages/Login'
import {BrowserRouter,Route} from 'react-router-dom'
			
ReactDOM.render(
	<BrowserRouter>
		<div style={{height:"100%"}}>
			<Route path="/" component={Main}/>
			<Route path="/login" component={Login}/>
		</div>
	</BrowserRouter>,document.getElementById('root'))