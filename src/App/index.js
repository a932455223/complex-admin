import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Main from '../Pages/Main'
import Login from '../Pages/Login'
import NotFound from '../Pages/NotFound'
const App =()=>(<BrowserRouter>
	<div style={{height:"100%"}}>
		<Route path="/customer" component={Main}/>
		<Route path="/login" component={Login}/>
		<Route  component={NotFound}/>
	</div>
</BrowserRouter>)

export default App
