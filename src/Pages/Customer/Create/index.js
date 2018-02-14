import React, {Component} from 'react'
import {Icon, Input, message, Form,Tabs,DatePicker} from 'antd'
const TabPane = Tabs.TabPane
const Fragment = React.Fragment
const FormItem = Form.Item
class CustomerUpdate extends Component {
    state = {
        customerName: '',
        createModel: false
    }
    onRecordChange = (evt) =>{

    }
    onChange = (evt) => {
        let {value} = evt.target
        this.setState({customerName: value})
    }
    onEnter = (evt) => {
        message.success('创建成功')
    }
    render() {

        const {getFieldDecorator} = this.props.form
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
        return (<div className="userInfo">
            <div className="header">
                <div className="icon"><Icon type="user"/></div>
                <span className="text">创建客户</span>
                <div className="operation">关注提醒</div>
            </div>
            {
                this.state.createModel && <div className="createCustomer">
                        <Input onPressEnter={this.onEnter} placeholder="输入客户名并按Enter" value={this.state.customerName} onChange={this.onChange} className="darkGray"/>
                    </div>
            }
            <Tabs defaultActivity="basicInfo">
                <TabPane tab="基础信息"  key="basicInfo">
                {
                    this.state.createModel || (
                    <Fragment>
                    <div  className="formcontainer">
                        <Form layout="inline">
                            <FormItem className="fullLine" {...formLayout} label="账户">
                                {getFieldDecorator('account')(<Input placeholder="一类账户"/>)}
                            </FormItem>
                            <FormItem  {...multiFormLayout} label="生&nbsp;&nbsp;&nbsp;&nbsp;日">
                                {getFieldDecorator('birthday')(<DatePicker getCalendarContainer={(evt) => {return document.getElementById('docker')}}/>)}
                            </FormItem>
                            <FormItem  {...multiFormLayout} label="手机号">
                                {getFieldDecorator('mobile')(<Input placeholder="输入手机号"/>)}
                            </FormItem>
                            <FormItem  {...multiFormLayout} label="微信号">
                                {getFieldDecorator('weichat')(<Input placeholder="输入微信号"/>)}
                            </FormItem>
                            <FormItem  {...multiFormLayout} label="身份证">
                                {getFieldDecorator('identity')(<Input placeholder="输入身份证"/>)}
                            </FormItem>
                        </Form>
                    </div>
                    <div className="recordContainer">
                    <Tabs type="card" defaultActiveKey="1" onChange={this.onRecordChange}>
                        <TabPane tab="维护记录" key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab="操作记录" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="修改记录" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                    </div>
                    </Fragment>
                )
                }
                </TabPane>
                <TabPane tab="家庭信息" key="familyInfo">fff</TabPane>
                <TabPane tab="工作信息" key="workInfo">gggg</TabPane>
            </Tabs>




        </div>)
    }
}
export default Form.create()(CustomerUpdate)
