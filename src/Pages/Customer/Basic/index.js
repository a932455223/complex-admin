import React,{Component} from 'react'
import {Icon, Input, message, Form,Tabs,DatePicker} from 'antd'
import request from '../../../utils/request.js'
import moment from 'moment'
import _ from 'lodash'
let formInputData = {}

const FormItem = Form.Item
class CustomerUpdate extends Component{
    onBlur = (evt)=>{
        let {id,value} = evt.target  //这里id是字段名称，比如account
        let errors = this.props.form.getFieldError(id)
        let noErrors = errors === undefined || errors.length === 0
        console.log(formInputData[id])
        console.log(value)

        if(noErrors && (formInputData[id] != value && formInputData[id]!==null && value !=='')){
            request.Put(`/customer/${this.props.rowData.id}`,{[id]:value}).then(()=> {
                message.success('数据修改成功')
                formInputData[id] = value
                this.props.refresh()
            }).catch(()=> message.error('数据修改失败'))
        }
    }

    onDateChange = (date) => {
        let d = new Date(date.format()).getTime()
        request.Put(`/customer/${this.props.rowData.id}`,{birthday:d}).then(()=> {
            message.success('数据修改成功')
            this.props.refresh()
        }).catch(()=> message.error('数据修改失败'))
    }

    onChange = (evt)=>{
        const {value,id} = evt.target
        // formInputData[id] = value
    }

    componentDidMount = () => {
        formInputData = _.cloneDeep(this.props.rowData)
    }

    componentWillUnmount = () => {
        formInputData = {}
    }

    render(){
        const {getFieldDecorator} = this.props.form
        const rowData = this.props.rowData
        const formLayout = {
            labelCol: {
                md:{
                    span:3
                }
            },
            wrapperCol: {
                md:{
                    span:10
                }
            }
        }
        const multiFormLayout = {
            labelCol:{
                md:{
                    span:7
                }
            },
            wrapperCol:{
                md:{
                    span:16
                }
            }
        }

        return (<Form layout="inline">
            <FormItem className="fullLine" {...formLayout} label="账户">
                {getFieldDecorator('account',{
                    initialValue:rowData.account
                })(<Input onChange={this.onChange} onBlur={this.onBlur} placeholder="一类账户"/>)}
            </FormItem>
            <FormItem className="fullLine" {...formLayout} label="地址">
                {getFieldDecorator('address',{
                    initialValue:rowData.address
                })(<Input onChange={this.onChange} onBlur={this.onBlur} placeholder="家庭住址"/>)}
            </FormItem>
            <FormItem  {...multiFormLayout} label="生&nbsp;&nbsp;&nbsp;&nbsp;日">
                {getFieldDecorator('birthday',{
                    initialValue:rowData.birthday ? moment(rowData.birthday):undefined
                })(<DatePicker onChange={this.onDateChange} placeholder="选择日期" getCalendarContainer={(evt) => {return document.getElementById('docker')}}/>)}
            </FormItem>
            <FormItem   {...multiFormLayout} label="手机号">
                {getFieldDecorator('phoneNumber',{rules:[{require:false,pattern:/[0-9]{11}/,message:'电话号码为11数字'}],initialValue:rowData.phoneNumber})(<Input onBlur={this.onBlur} placeholder="输入手机号"/>)}
            </FormItem>
            <FormItem  {...multiFormLayout} label="微信号">
                {getFieldDecorator('weichat',{
                    initialValue:rowData.weichat
                })(<Input onBlur={this.onBlur} placeholder="输入微信号"/>)}
            </FormItem>
            <FormItem  {...multiFormLayout} label="身份证">
                {getFieldDecorator('identity')(<Input onBlur={this.onBlur} placeholder="输入身份证"/>)}
            </FormItem>
            <FormItem  {...multiFormLayout} label="年&nbsp;&nbsp;&nbsp;&nbsp;龄">
                {getFieldDecorator('age',{
                    rules:[{pattern:/[1-9]{1,3}/,message:'年龄为有效数字'}],
                    initialValue:rowData.age
                })(<Input onBlur={this.onBlur} placeholder="输入身年龄"/>)}
            </FormItem>
        </Form>)
    }
}

const CustomerUpdateForm= Form.create()(CustomerUpdate)
export default CustomerUpdateForm
