import React, {Component} from 'react'
import {Icon, Input, message, Form,Tabs,DatePicker} from 'antd'
import request from '../../../utils/request.js'
import moment from 'moment'
import _ from 'lodash'
const TabPane = Tabs.TabPane
const Fragment = React.Fragment
const FormItem = Form.Item


let formInputData = {}

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

const CustomerUpdateForm = Form.create()(CustomerUpdate)

class Customer extends Component {
    state = {
        customerName: ''
    }
    onTabsChange = (evt) =>{

    }

    shouldComponentUpdate = (nextProps,nextState)=>{
        if(nextProps.createModel || (nextProps.rowData.id && nextProps.rowData.id !==this.props.rowData.id)){
            return true
        }
        return false
    }

    componentWillReceiveProps = () => {
        console.log('com com go go go.')
    }


    onChange = (evt) => {
        let {value} = evt.target
        this.setState({customerName: value})
    }

    onEnter = (evt) => {
        let {value} = evt.target
        if(value.trim() ===''){
            message.warn('客户名不能为空')
        }

        request.Post('/customer',{name:value}).then(()=>{
            message.success('客户创建成功')
            this.props.refresh()
        })

    }

    onClose = (evt) => {
        this.props.closeDocker()
    }
    render() {
        console.log(this.props.createModel)
        return (<div className="userInfo">
            <div className="header">
                <div className="icon"><Icon type="user"/></div>
                <span className="text">创建客户</span>
                <div className="operation"><div onClick={this.onClose} className="close"><Icon type="close"/>关闭</div></div>
            </div>
            {
                this.props.createModel && <div className="createCustomer">
                        <Input onPressEnter={this.onEnter} placeholder="输入客户名并按Enter" value={this.state.customerName} onChange={this.onChange} className="darkGray"/>
                    </div>
            }
            {
                (!this.props.createModel) && (<Tabs defaultActivity="basicInfo">
                    <TabPane tab="基础信息"  key="basicInfo">
                    <div className="formcontainer">
                    {this.props.rowData.id &&
                        <CustomerUpdateForm refresh={this.props.refresh} rowData={this.props.rowData} key={this.props.rowData.id.toString()} />
                    }
                    </div>
                    <div className="recordContainer">
                    <Tabs type="card" defaultActiveKey="1" onChange={this.onTabsChange}>
                        <TabPane tab="维护记录" key="1">
                            <ul className="timeline">
                                <li>
                                    <div className="line"></div>
                                    <div className="time">今天</div>
                                    <div>
                                        闫晓飞
                                        <p className="content">【电话】进行了3次【产品到期提醒】</p>
                                        <p className="details">
                                            介绍理财产品，制定理财计划书，客户下单。
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </TabPane>
                        <TabPane tab="操作记录" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="修改记录" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                    </div>
                    </TabPane>
                    <TabPane tab="家庭信息" key="familyInfo">fff</TabPane>
                    <TabPane tab="工作信息" key="workInfo">gggg</TabPane>
                </Tabs>)
            }
        </div>)
    }
}
export default Customer
