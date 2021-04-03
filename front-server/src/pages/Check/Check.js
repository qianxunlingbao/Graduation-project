import React, { Component } from 'react'
import { Button, Tooltip,Empty} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
export default class Check extends Component {

    state = {
        data: [],
        id: '',
        proname: '',
        prohard: '',
        margin: '',
        isCheck:true
    }

    mycheck = React.createRef()
    //this.mycheck.current.value

    //查找毕设
    Check = () => {
        console.log(this.mycheck.current.value)
        fetch(`http://localhost:3000/api1/check/${this.mycheck.current.value}`)
            .then(
                res => {
                    return res.json();
                }).then(json => {
                    console.log(json)
                    this.setState({
                        data: json,
                        isCheck:!this.state.isCheck
                    })
                })
            .then(
                error => {
                    console.log(error)
                }
            )
    }
    render() {
        return (
            <div>
                <input ref={this.mycheck} type="text" placeholder="请输入关键词！！！"/>
                <Tooltip title="search">
                    <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={this.Check} />
                </Tooltip>{

this.state.isCheck ?
<Empty style={{marginTop:'20px'}} /> :
                <div style={{ width: '100%', overflow: 'scroll', height: '600px', marginTop: '18px' }}>
                        <table border="2" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>标题</th>
                                <th>程度</th>
                                <th>容量</th>
                                {/*<th>操作</th>*/}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.proname}</td>
                                            <td>{item.prohard}</td>
                                            <td>{item.margin}</td>
                                            {/*<td><button id={index} onClick={this.del}>删除</button></td>*/}
                                        </tr>
                                    )

                                })
                            }
                        </tbody>
                    </table>
                </div>}
            </div>
        )
    }
}
