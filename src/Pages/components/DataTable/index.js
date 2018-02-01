import React,{Component} from 'react'
import {Input,Button,Tag,Table} from 'antd'
const Search = Input.Search;

const filterData = {
	customer:{
		filter:[{
			filterName:'客户类别',
			paramName:'customerCategory'
		},{
			filterName:'评级',
			paramName:'lever'
		},{
			filterName:'风险偏好',
			paramName:'riskPreference'
		}]
	}
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
		selectedRowKeys:[]
	}

	onSelectChange = ()=>{

	}

	onTableChange = (pagination,filter,sorter)=>{
		console.log(pagination)
		console.log(filter)
		console.log(sorter)
	}
	render(){
		const rowSelection = {
      selectedRowKeys:this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    }
		return (
			<div className="contentWrap">
				<div className="topBox">
					<div className="customerList">客户列表</div><div className="filterHandler">高级筛选</div>
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
						<span className="category">客户类别：</span><Tag  closable>个人客户</Tag><Tag  closable>个人客户</Tag><Tag  closable>个人客户</Tag>
					</div>
				</div>
				<Table className="yptable" onChange={this.onTableChange} rowSelection={rowSelection} dataSource={dataSource} columns={columns} pagination={paginationConfig} />
			</div>
			)
	}
}
