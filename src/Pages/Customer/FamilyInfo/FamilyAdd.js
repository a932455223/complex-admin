import React,{Component} from 'react'
import FamilyForm from './FamilyForm'
import {Icon,Form,Input,message} from 'antd'
import request from '../../../utils/request.js'
const FormItem = Form.Item
class FamilyAddFormTemplate extends Component{

    save = (evt) =>{
        let {getFieldsValue} = this.props.form
        let data = getFieldsValue()
        data.customerId = this.props.customerId
        console.log(data)
        request.Post(`/customer/${data.customerId}/faminlyInfo`,data).then(()=>{
            message.success('创建成功')
        })
    }
    render(){
        const {getFieldDecorator} = this.props.form
        return (
            <div className='faminlyInfo'>
                <Form layout="inline" className="faminlyBox">
                    <div className="header">
                        <FormItem>
                            {getFieldDecorator('name',{
                                require:true,
                                message:'姓名不能为空'
                            })(<Input  prefix={<Icon type="user" />} className='userInput'/>)}
                        </FormItem>
                        <span onClick={this.props.onCancel} style={{marginLeft:'auto'}} className="operater">取消</span>
                        <span onClick={this.save} className="operater">保存</span>
                    </div>
                    <div className="content">
                            <FormItem label='关&nbsp;&nbsp;&nbsp;系'>
                                {getFieldDecorator('relation',{
                                    require:true,
                                    message:'关系不能为空'
                                })(<Input />)}
                            </FormItem>
                            <FormItem label='电&nbsp;&nbsp;&nbsp;话'>
                                {getFieldDecorator('phoneNumber')(<Input />)}
                            </FormItem>
                            <FormItem label='身份证'>
                                {getFieldDecorator('identityId')(<Input />)}
                            </FormItem>
                            <FormItem label='工&nbsp;&nbsp;&nbsp;作'>
                                {getFieldDecorator('job')(<Input />)}
                            </FormItem>
                    </div>
                </Form>
            </div>
        )
    }
}
const FamilyAddForm = Form.create()(FamilyAddFormTemplate)

export default class FamilyAdd extends Component{

    state = {
        model:'add',
    }
    addFamily = ()=>{
        this.setState({model:'form'})
    }

    onCancel = ()=>{
        this.setState({model:'add'})
    }
    render(){
            const Add = (
            <div className="faminlyInfo add">
                <div className='box' onClick={this.addFamily}>
                    <Icon type="plus-circle-o" style={{fontSize:"40px"}} />
                    <p style={{paddingTop:'10px'}}>添加家庭成员</p>
                </div>
            </div>)

            return (this.state.model === 'add' ? Add:<FamilyAddForm {...this.props} onCancel={this.onCancel}/>)
    }
}
