import React,{ Component } from 'react'
import { BrowserRouter,Route } from 'react-router-dom'
import Main from '../Pages/Main'

// export default function App(){
// 	return <BrowserRouter><Route component={Dashboard}/></BrowserRouter>
// }


export default class App extends Component{

	state = {
		isAuth:true
	}

	componentWillmount(){
		let token = this.getToken()
		// this.setState({
		// 	isAuth: token === undefined ? false:true
		// })
	}

	getToken(){
		let token;
		if(window.localStorage){
			token = localStorage.getItem('token')
		}else{
			token = window.token
		}
		return token
	}

	render(){
		// return this.state.isAuth ? <Main/>:<h1>please login in.</h1>
		return <Route path="/" Component={Main} />
	}
}
