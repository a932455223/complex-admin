import React,{Component} from 'react'
import {Icon} from 'antd'


export default class FamilyInfo extends Component{
    render(){
        return (
            <div className="faminlyInfo">
                <div className="faminlyBox">
                    <div className="header">
                        <Icon type="user" />
                        <span>王海波</span>
                        <span><Icon type="delete"/>删除</span>
                        <span><Icon type="edit" />编辑</span>
                    </div>
                    <div className="content">
                        <p>
                            <span>关系</span>夫妻
                        </p>
                        <p>
                            <span>关系</span>夫妻
                        </p>
                        <p>
                            <span>关系</span>夫妻
                        </p>
                        <p>
                            <span>关系</span>夫妻
                        </p>

                    </div>
                </div>
            </div>
        )
    }
}
