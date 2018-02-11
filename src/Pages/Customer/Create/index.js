import React, {Component} from 'react'
import {Icon, Input, message, Form} from 'antd'
const FormItem = Form.Item
class CustomerUpdate extends Component {
    state = {
        customerName: '',
        createModel: false
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
                xs: {
                    span: 24
                },
                sm: {
                    span: 3
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 17
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

            {
                this.state.createModel || (<div className="formcontainer">
                    <Form>
                        <FormItem className="account" {...formLayout} label="账户">
                            {getFieldDecorator('account')(<Input/>)}
                        </FormItem>
                    </Form>
                </div>)
            }

        </div>)
    }
}
export default Form.create()(CustomerUpdate)
