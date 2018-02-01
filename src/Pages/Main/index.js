import React,{ Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { Link,Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import './main.less'
import DataTable from '../components/DataTable'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Main extends Component{

    componentWillMount(){
        
    }

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
        <Menu.Item key="branch"><Link to='/branch/list'><Icon type="bank"/>组织机构管理</Link></Menu.Item>
        <Menu.Item key="workspace"><Icon type="area-chat"/>工作台</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          selectedKeys={[`${navKeys[0]}${navKeys[1]}`]}
          openKeys={[navKeys[0]]}
          style={{ height: '100%', borderRight: 0 }}
          theme="dark"
        >
          <SubMenu key="customer" title={<span><Icon type="user" />客户资料</span>}>
            <Menu.Item key="customermy"><Link to='/customer/my'>我的客户</Link></Menu.Item>
            <Menu.Item key="customerfocus"><Link to='/customer/focus'>我关注的客户</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="branch" title={<span><Icon type="laptop" />组织机构管理</span>}>
            <Menu.Item key="branchlist"><Link to="/branch/list">网点列表</Link></Menu.Item>
            <Menu.Item key="branchstaffs"><Link to="/branch/staffs">员工列表</Link></Menu.Item>
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
        <Content className="main">
          <Route path="/customer" component={DataTable} />
        </Content>
      </Layout>
    </Layout>
  </Layout>)
	}
}
