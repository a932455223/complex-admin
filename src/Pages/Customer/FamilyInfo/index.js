import React,{Component} from 'react'
import {Icon} from 'antd'
import FamilyForm from './FamilyForm'

export default class FamilyInfo extends Component{
    state = {
        model:'view'
    }

    onDelete = (evt)=>{

    }

    onEdit = (evt) =>{
        this.setState({model:'edit'})
    }

    onCancel = (evt) =>{
        console.log('cancel')
        this.setState({model:'view'})
    }
    render(){
        const relative = this.props.relativeData
        const view = (
            <div className="faminlyInfo">
                <div className="header">
                    <Icon type="user" />
                    <span className="username">{relative.name}</span>
                    <span onClick={this.onDelete} className="operater"><Icon type="delete"/>删除</span>
                    <span onClick={this.onEdit} className="operater"><Icon type="edit" />编辑</span>
                </div>
                <div className="content">
                    <p>
                        <span>关系</span>{relative.relation}
                    </p>
                    <p>
                        <span>联系方式</span>{relative.phoneNumber}
                    </p>
                    <p>
                        <span>身份证号</span>{relative.identityId}
                    </p>
                    <p>
                        <span>工作属性</span>{relative.job}
                    </p>
                </div>
            </div>
        )

        const form = <FamilyForm onCancel={this.onCancel} relativeData={relative}/>

        return this.state.model === 'edit' ? form:view
    }
}
