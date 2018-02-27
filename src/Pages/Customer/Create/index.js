import React, {PureComponent} from 'react'
import {Icon, Input, message,Tabs,Spin} from 'antd'
import request from '../../../utils/request.js'
import BasicInfo from '../Basic/index'
import FamilyInfo from '../FamilyInfo/index'
const TabPane = Tabs.TabPane
const Fragment = React.Fragment




class Customer extends PureComponent {
    state = {
        customerName: '',
        familyInfo:[],
        familyLoading:false
    }
    onRecordChanged = (evt) =>{
        console.log('tabs is changed')
    }

    onInfoChanged = (comKey) =>{
        if(comKey === 'familyInfo' && this.state.familyInfo.length === 0){
            this.setState({familyLoading:true})
            request.Get(`/customer/${this.props.rowData.id}/faminlyInfo`)
                .then((res)=>{
                    this.setState({familyInfo:res.data.data,familyLoading:false})
                })
        }
    }

    // shouldComponentUpdate = (nextProps,nextState)=>{
    //     if(nextProps.createModel != this.props.createModel || (nextProps.rowData.id && nextProps.rowData.id !==this.props.rowData.id)){
    //         return true
    //     }
    //     return false
    // }

    addFamily = () => {

    }
    componentWillReceiveProps = () => {
        console.log('customer create receive props')
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
        console.log(this.state.familyInfo)
        console.log(this.props.createModel)
        return (<div className="userInfo">
            <div className="header">
                <div className="icon"><Icon type="user"/></div>
                <span className="text">{this.props.createModel ? '创建客户':(this.props.rowData && this.props.rowData.name)}</span>
                <div className="operation"><div onClick={this.onClose} className="close"><Icon type="close"/>关闭</div></div>
            </div>
            {
                this.props.createModel && <div className="createCustomer">
                        <Input onPressEnter={this.onEnter} placeholder="输入客户名并按Enter" value={this.state.customerName} onChange={this.onChange} className="darkGray"/>
                    </div>
            }
            {
                (!this.props.createModel) && (<Tabs  onChange={this.onInfoChanged} defaultActivity="basicInfo">
                    <TabPane tab="基础信息"  key="basicInfo">
                    <div className="formcontainer">
                    {this.props.rowData.id &&
                        <BasicInfo refresh={this.props.refresh} rowData={this.props.rowData} key={this.props.rowData.id.toString()} />
                    }

                    </div>
                    <div className="recordContainer">
                    <Tabs type="card" defaultActiveKey="1" onChange={this.onRecordChanged}>
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
                    <TabPane tab="家庭信息" key="familyInfo">
                    <Spin spinning={this.state.familyLoading}>
                        <div className="familyBox">
                            {this.state.familyInfo.map((relative => <FamilyInfo key={relative.id.toString()} relativeData={relative}/>))}
                            <div className="faminlyInfo add">
                                <div className='box' onClick={this.addFamily}>
                                    <Icon type="plus-circle-o" style={{fontSize:"40px"}} />
                                    <p style={{paddingTop:'10px'}}>添加家庭成员</p>
                                </div>
                            </div>
                        </div>
                    </Spin>
                    </TabPane>
                    <TabPane tab="工作信息" key="workInfo">gggg</TabPane>
                </Tabs>)
            }
        </div>)
    }
}
export default Customer
