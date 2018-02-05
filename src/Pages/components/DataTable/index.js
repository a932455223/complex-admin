import React,{Component} from 'react'
import {Input,Button,Tag,Table} from 'antd'
import  classNames  from 'classnames'
const Search = Input.Search;
const { CheckableTag } = Tag
const filterData = {
	customer:[{
		filterText:'客户类别',
		paramName:'customerCategory',
		options:[{id:1,text:'个人客户'},{id:2,text:'企业客户'}]
	},{
		filterText:'评级',
		paramName:'lever',
		options:[{id:3,text:'普通客户'},{id:4,text:'VIP客户'},{id:5,text:'未激活客户'}]
	},{
		filterText:'风险偏好',
		paramName:'riskPreference',
		options:[{id:6,text:'保守型'},{id:7,text:'激进型'},{id:8,text:'稳健性'}]
	}]
}
const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
},
{
  key: '3',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
},
{
  key: '4',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
},
{
  key: '5',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
  sorter:true
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];

const paginationConfig = {
	size:'small'
}
export default class DataTable extends Component{

	state = {
		selectedRowKeys:[],
		selectedFilter:[],
		openFilter:false
	}

	onSelectChange = ()=>{
	}

	onTableChange = (pagination,filter,sorter)=>{
		console.log(pagination)
		console.log(filter)
		console.log(sorter)
	}

	onSelect(index) {
		let paramName = filterData.customer[index].paramName
	}
	openFilter = () => {
		this.setState({
			openFilter:!this.state.openFilter
		})
	}
	render(){
		const rowSelection = {
      selectedRowKeys:this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    }
		return (
			<div className="contentWrap">
				<div className="topBox">
					<div className="customerList">客户列表</div>
					<div className="filterHandler">
						<span onClick={this.openFilter}>高级筛选</span>
						<div className={classNames('filterbox',{active:this.state.openFilter})}>
						{
							filterData.customer.map((fliter,index) =>{
								return (
								<div key={fliter.paramName}>
									<h4 className="title">{fliter.filterText}</h4>
									{fliter.options.map((option)=> {
										return <CheckableTag key={option.id.toString()} onChange={this.onSelect.bind(this,index)}>{option.text}</CheckableTag>
									})}
								</div>)
							})
						}

						</div>
					</div>
					<div className="searchBox">
					<Search
				      placeholder="客户名或手机号"
				      onSearch={value => console.log(value)}
				      style={{ width: 200 }}
			    	/>
			    </div>
			    <Button type="primary" icon="plus">创建客户</Button>
				</div>
				<div style={{borderTop:"1px solid rgb(230,230,230)"}} className="topBox">
					<div className="filterItem">
						<span className="category">客户类别：</span><Tag  closable>个人客户</Tag><Tag  closable>个人客户</Tag><Tag  closable>个人客户</Tag>
					</div>
					<div className="filterItem">
						<span className="category">评级：</span><Tag  closable>个人客户</Tag><Tag  closable>个人客户</Tag><Tag  closable>个人客户</Tag>
					</div>
					<div className="filterItem">
						<span className="category">风险偏好：</span><Tag  closable>个人客户</Tag><Tag  closable>个人客户</Tag><Tag  closable>个人客户</Tag>
					</div>
				</div>
				<Table className="yptable" onChange={this.onTableChange} rowSelection={rowSelection} dataSource={dataSource} columns={columns} pagination={paginationConfig} />
			</div>
			)
	}
}
