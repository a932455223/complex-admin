import React from 'react'
import ReactDOM from 'react-dom'
import {message} from 'antd'
import {BrowserRouter,Route} from 'react-router-dom'
import {AppContainer} from 'react-hot-loader'
import App from './App/index'
message.config({getContainer(){return document.getElementById('root')}})

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,document.getElementById('root'))
}

render(App)
console.log(module.hot)
if (module.hot) {
  module.hot.accept('./App/index', () => {
    render(App)
  })
}
