import React, {Component} from 'react'
import {Input, Button, Tag, Table} from 'antd'
import classNames from 'classnames'
import request from '../../../utils/request'
import update from 'immutability-helper'
import CusomerCreate from '../../Customer/Create'
import Docker from '../Docker'

const Search = Input.Search;
const {CheckableTag} = Tag
const filterData = {
    customer: [
        {
            filterText: '客户类别',
            paramName: 'customerCategory',
            options: [
                {
                    id: 1,
                    text: '个人客户'
                }, {
                    id: 2,
                    text: '企业客户'
                }
            ]
        }, {
            filterText: '评级',
            paramName: 'customerLever',
            options: [
                {
                    id: 3,
                    text: '普通客户'
                }, {
                    id: 4,
                    text: 'VIP客户'
                }, {
                    id: 5,
                    text: '未激活客户'
                }
            ]
        }, {
            filterText: '风险偏好',
            paramName: 'customerRiskPreference',
            options: [
                {
                    id: 6,
                    text: '保守型'
                }, {
                    id: 7,
                    text: '激进型'
                }, {
                    id: 8,
                    text: '稳健性'
                }
            ]
        }
    ]
}
const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
    }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    }, {
        key: '3',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    }, {
        key: '4',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    }, {
        key: '5',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    }
];

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: true
    }, {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
    }
];

const paginationConfig = {
    size: 'small'
}

export default class DataTable extends Component {

    state = {
        selectedRowKeys: [],
        selectedFilter: [],
        openFilter: false,
        filterData: [],
        isOpen:false,
        createModel:false
    }

    onSelectChange = (keys,rows) => {
        console.log(keys)
        console.log(rows)
    }

    onTableChange = (pagination, filter, sorter) => {
        console.log(pagination)
        console.log(filter)
        console.log(sorter)
    }

    onSelect(id, text, index) {
		let newState;
        if (!this.state.selectedFilter[index]) { //没有选中的项目则创建
            let item = {
                filterText: this.state.filterData[index].filterText,
                paramName: this.state.filterData[index].paramName,
                options: [
                    {
                        id,
                        text
                    }
                ]
            }
		newState = update(this.state,{selectedFilter:{[index]:{$set:item}}})
        } else {
			let selectedIndex = this.state.selectedFilter[index].options.map(opt => opt.id).indexOf(id)
			console.log(`${selectedIndex} ${id}`)
			if(selectedIndex > -1){
				newState = update(this.state,{selectedFilter:{[index]:{options:{$splice:[[selectedIndex,1]]}}}})
			}else{
				newState = update(this.state,{selectedFilter:{[index]:{options:{$push:[{id,text}]}}}})
			}
		}

		console.log(newState.selectedFilter[index])
		this.setState(newState)

    }
    openFilter = () => {
        this.setState({
            openFilter: !this.state.openFilter
        })
    }

    componentDidMount = () => {
        request.Get('/filter/customer').then((response) => {
            this.setState({filterData: response.data.customer})
        })
    }
	isFilterChecked = (index,id)=>{
		if(!this.state.selectedFilter[index]){
			return false
		}
		return this.state.selectedFilter[index].options.map(opt => opt.id).includes(id)
	}

	contentClick = ()=>{
		this.state.openFilter && this.setState({openFilter:false})
	}

    rowClick(record,index){
        this.setState({isOpen:true})
    }

    closeDocker = () =>{
        this.setState({isOpen:false})
    }

    addCustomer = ()=>{
        this.setState({isOpen:true,createModel:true})
    }
    render() {
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange
        }
        const resourse = 'customer'
        return (<div className="contentWrap">
            <div onClick={this.contentClick} className="topBox">
                <div className="customerList">客户列表</div>
                <div className="filterHandler">
                    <span onClick={this.openFilter}>高级筛选</span>
                    <div className={classNames('filterbox', {active: this.state.openFilter})} onClick={(evt)=>{evt.stopPropagation()}}>
                        {
                            this.state.filterData.length > 0 && this.state.filterData.map((fliter, index) => {
                                return (<div key={fliter.paramName}>
                                    <h4 className="title">{fliter.filterText}</h4>
                                    {
                                        fliter.options.map((option) => {
                                            return <CheckableTag checked={this.isFilterChecked(index,option.id)}  key={option.id.toString()} onChange={this.onSelect.bind(this, option.id, option.text, index)}>{option.text}</CheckableTag>
                                        })
                                    }
                                </div>)
                            })
                        }

                    </div>
                </div>
                <div className="searchBox">
                    <Search placeholder="客户名或手机号" onSearch={value => console.log(value)} style={{
                            width: 200
                        }}/>
                </div>
                <Button type="primary" onClick={this.addCustomer} icon="plus">创建客户</Button>
            </div>
            <div style={{
                    borderTop: "1px solid rgb(230,230,230)"
                }} className="topBox">
				{this.state.selectedFilter.map((item)=>{
					return item.options.length > 0 && (<div key={item.paramName} className="filterItem">
	                    <span className="category">{item.filterText}：</span>
						{item.options.map((opt)=>{
							return (<Tag key={opt.id.toString()} closable="closable">{opt.text}</Tag>)
						})}
	                </div>)
				})}
            </div>
            <Table onRow={(record,index)=>({onClick:this.rowClick.bind(this,record,index)})}  rowKey={record => record.key} bordered={true} className="yptable" onChange={this.onTableChange} rowSelection={rowSelection} dataSource={dataSource} columns={columns} pagination={paginationConfig}/>
            <Docker open={this.state.isOpen}>
                <CusomerCreate createModel={this.state.createModel} closeDocker={this.closeDocker}/>
            </Docker>
        </div>)
    }
}
