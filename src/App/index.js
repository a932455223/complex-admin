import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Main from '../Pages/Main'
import Login from '../Pages/Login'
const App =()=>(<BrowserRouter>
	<div style={{height:"100%"}}>
		<Route path="/" component={Main}/>
		<Route path="/login" component={Login}/>
	</div>
</BrowserRouter>)

export default App
