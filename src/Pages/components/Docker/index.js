import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const dockerEl = document.getElementById('docker')
export default class Docker extends Component{
    constructor(props){
        super(props)
        this.el = document.createElement('div')
        this.el.classList.add('dockerContent')
    }

    componentDidMount(){
        dockerEl.appendChild(this.el)
    }

    componentWillUnmount(){
        dockerEl.removeChild(this.el)
    }
    render(){
        return ReactDOM.createPortal(this.props.children,this.el)
    }
}
