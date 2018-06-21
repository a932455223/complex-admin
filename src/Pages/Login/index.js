import React,{ Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item

class Login extends Component{
	render(){
		const { getFieldDecorator } = this.props.form
		return (
			<div className='login-wrap'>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						{getFieldDecorator('userName', {
							rules: [{ required: true, message: '请输入用户名' }],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>记住密码</Checkbox>
						)}
						 <a href="">注册</a>
					</FormItem>
					<FormItem>
						<Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
					</FormItem>

				</Form>
			</div>
		)
		
	}
}


export default Form.create()(Login)