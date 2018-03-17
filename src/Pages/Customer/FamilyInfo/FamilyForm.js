import React,{Component} from 'react'
import {Input,Form,Icon} from 'antd'
import request from '../../../utils/request'
const FormItem = Form.Item
class FamilyForm extends Component{

    save = (evt)=>{
            let data = this.props.form.getFieldsValue()
            request.Put(`/family/${this.props.relativeData.id}`,data).then((res)=>{
                if(res.data.code === 200){
                    this.props.loadFamily()
                    this.props.onCancel()
                }
            })
    }

    render(){
        const relative = this.props.relativeData
        const { getFieldDecorator } = this.props.form;
        return (
        <div className='faminlyInfo'>
            <Form layout="inline" className="faminlyBox">
                <div className="header">
                    <FormItem>
                        {getFieldDecorator('name',{
                            initialValue:relative.name
                        })(<Input  prefix={<Icon type="user" />} className='userInput'/>)}
                    </FormItem>
                    <span onClick={this.props.onCancel} style={{marginLeft:'auto'}} className="operater">取消</span>
                    <span onClick={this.save} className="operater">保存</span>
                </div>
                <div className="content">
                        <FormItem label='关&nbsp;&nbsp;&nbsp;系'>
                            {getFieldDecorator('relation',{
                                initialValue:relative.relation
                            })(<Input />)}
                        </FormItem>
                        <FormItem label='电&nbsp;&nbsp;&nbsp;话'>
                            {getFieldDecorator('phoneNumber',{
                                initialValue:relative.phoneNumber
                            })(<Input />)}
                        </FormItem>
                        <FormItem label='身份证'>
                            {getFieldDecorator('identityId',{
                                initialValue:relative.identityId
                            })(<Input />)}
                        </FormItem>
                        <FormItem label='工&nbsp;&nbsp;&nbsp;作'>
                            {getFieldDecorator('job',{
                                initialValue:relative.job
                            })(<Input />)}
                        </FormItem>
                </div>
            </Form>
        </div>
    )
    }
}

export default Form.create()(FamilyForm)
