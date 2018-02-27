import React,{Component} from 'react'
import {Icon} from 'antd'


export default class FamilyInfo extends Component{

    render(){
        const relative = this.props.relativeData
        return (
            <div className="faminlyInfo">
                <div className="faminlyBox">
                    <div className="header">
                        <Icon type="user" />
                        <span className="username">{relative.name}</span>
                        <span className="operater"><Icon type="delete"/>删除</span>
                        <span className="operater"><Icon type="edit" />编辑</span>
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
            </div>
        )
    }
}
