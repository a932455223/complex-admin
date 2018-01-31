import React,{Component} from 'react'
import {Input,Button,Tag} from 'antd'
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

export default class DataTable extends Component{

	render(){
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
				<div style={{borderTop:"1px solid #BCBCBC"}} className="topBox">
					<div className="filterItem">
						<span className="category">客户类别：</span><Tag  closable afterClose={()=>{}}>个人客户</Tag><Tag  closable afterClose={()=>{}}>个人客户</Tag><Tag  closable afterClose={()=>{}}>个人客户</Tag>
					</div>
					<div className="filterItem">
						<span className="category">客户类别：</span><Tag  closable afterClose={()=>{}}>个人客户</Tag><Tag  closable afterClose={()=>{}}>个人客户</Tag><Tag  closable afterClose={()=>{}}>个人客户</Tag>
					</div>
					<div className="filterItem">
						<span className="category">客户类别：</span><Tag  closable afterClose={()=>{}}>个人客户</Tag><Tag  closable afterClose={()=>{}}>个人客户</Tag><Tag  closable afterClose={()=>{}}>个人客户</Tag>
					</div>
				</div>
			</div>)
	}
}