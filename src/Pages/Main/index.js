import React,{ Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
import './main.css'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Main extends Component{
  
	render(){
    const navKeys = location.pathname.substr(1).split('/')
		return (<Layout>
    <Header className="header">
      <div className="logo" />
      <Menu
        mode="horizontal"
        selectedKeys={[navKeys[0]]}
        style={{ lineHeight: '64px' }}
        className="topNav"
      >
        <Menu.Item key="customer"><Link to='/customer/my'><Icon type="user"/>客户管理</Link></Menu.Item>
        <Menu.Item key="branches"><Link to='/branches'><Icon type="bank"/>网点管理</Link></Menu.Item>
        <Menu.Item key="workspace"><Icon type="area-chat"/>工作台</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          selectedKeys={[navKeys[1]]}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          theme="dark"
        >
          <SubMenu key="sub1" title={<span><Icon type="user" />客户资料</span>}>
            <Menu.Item key="my"><Link to='/customer/my'>我的客户</Link></Menu.Item>
            <Menu.Item key="focus"><Link to='/customer/focus'>我关注的客户</Link></Menu.Item>
            <Menu.Item key="3">公海客户</Menu.Item>
            <Menu.Item key="4">我下属的客户</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="laptop" />网点管理</span>}>
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{background:"#F3F4F5" }}>
        <Content style={{ background: '#fff', margin: 24, minHeight: 280 }}>
          Content
        </Content>
      </Layout>
    </Layout>
  </Layout>)
	}
}