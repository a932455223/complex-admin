import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import className from 'classnames'
const dockerEl = document.getElementById('docker')
export default class Docker extends Component{
    constructor(props){
        super(props)
        this.el = document.createElement('div')
        this.el.classList.add('dockerContent')
    }

    componentDidMount(){
        dockerEl.appendChild(this.el)
        dockerEl.style.display='block'
    }

    componentWillUnmount(){
        dockerEl.removeChild(this.el)
    }
    render(){
        if(this.props.open){
            dockerEl.classList.add('open')
        }else{
            dockerEl.classList.remove('open')
        }
        return ReactDOM.createPortal(this.props.children,this.el)
    }
}
