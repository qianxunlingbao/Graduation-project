import React, { Component } from 'react'
import { Upload, Button } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
export default class Trouble extends Component {

    state = {
        data: [],
        id: '',
        troitem: '',
        troans: '',
        num: ''
    }

    //操作输入id
    handleId = (e) => {
        this.setState({
            id: e.target.value
        })
    }
    //操作输入troitem
    handleTroitem = (e) => {
        this.setState({
            troitem: e.target.value
        })
    }
    //操作输入troans
    handleTroans = (e) => {
        this.setState({
            troans: e.target.value
        })
    }
    componentDidMount() {
        var num = localStorage.getItem('userid')
        console.log(num)
        this.setState({
            num: num
        })
        fetch(`http://localhost:3000/api1/trouble`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(json => {
            //console.log(json)
            this.setState({
                data: json
            })
        }).then(
            error => {
                console.log(error)
            }
        )

    }

    //删除
    del = (e) => {
        console.log('执行删除')
        fetch(`http://localhost:3000/api1/deleteTrouble/${this.state.data[e.currentTarget.id].id}`).then(
            () => {
                fetch(`http://localhost:3000/api1/trouble`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    return res.json();
                }).then(json => {
                    //console.log(json)
                    this.setState({
                        data: json
                    })
                }).then(
                    error => {
                        console.log(error)
                    }
                )
            }
        )
    }

    //询问
    add = () => {
        console.log('执行添加')
        fetch(`http://localhost:3000/api1/addtro/${this.state.id}/${this.state.troitem}`).then(
            () => {
                fetch(`http://localhost:3000/api1/trouble`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    return res.json();
                }).then(json => {
                    console.log(json)
                    this.setState({
                        data: json
                    })
                }).then(
                    error => {
                        console.log(error)
                    }
                )
            }
        )
    }
    //答复
    answer = () => {
        console.log('执行添加')
        fetch(`http://localhost:3000/api1/answerTrouble/${this.state.id}/${this.state.troans}`).then(
            () => {
                fetch(`http://localhost:3000/api1/trouble`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    return res.json();
                }).then(json => {
                    console.log(json)
                    this.setState({
                        data: json
                    })
                }).then(
                    error => {
                        console.log(error)
                    }
                )
            }
        )
    }
    render() {
        return (
            <div style={{ width: '100%', overflow: 'scroll', height: '600px', marginTop: '20px', fontFamily: '楷体' }}>
                <p>答疑界面</p>
                {
                    this.state.data.map((item, index) => {
                        return (
                            <div key={index} style={{ width: '50%', textAlign: 'left', marginLeft: '10%' }}>
                                <div><p>问题{item.id}：{item.troitem}</p></div>
                                <div><p>答复：{item.troans} <button id={index} onClick={this.del}><DeleteTwoTone /></button></p></div>
                            </div>
                        )

                    })
                }
                {/*<table border="2" style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <th>问题ID</th>
                            <th>问题题目</th>
                            <th>问题答复</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map((item,index) => {
                            return(
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.troitem}</td>
                                    <td>{item.troans}</td>
                                    <td><button id={index} onClick={this.del}>删除</button></td>
                                </tr>
                            )
                            
                        })
                    }
                    </tbody>
                </table>*/}
                {
                    this.state.num < 99 ?
                        <div style={{ marginTop: '100px' }}>
                            <p style={{ fontFamily: '华文彩云', color: 'red' }}>温馨提示：</p>
                            <p style={{ fontFamily: '华文彩云' }}>由于咱们的数据具有唯一性，请在添加时，注意ID不要填写已有ID。谢谢合作！！！祝您使用愉快！！！</p>
                    ID:<input type='text' onChange={this.handleId} />
                    问题答复:<input type='text' onChange={this.handleTroans} />
                            <br />
                            <br />
                            <Button onClick={this.answer}>答复</Button>
                        </div> :
                        <div style={{ marginTop: '100px' }}>
                            <p style={{ fontFamily: '华文彩云', color: 'red' }}>温馨提示：</p>
                            <p style={{ fontFamily: '华文彩云' }}>由于咱们的数据具有唯一性，请在添加时，注意ID不要填写已有ID。谢谢合作！！！祝您使用愉快！！！</p>
                    ID:<input type='text' onChange={this.handleId} />
                    问题题目:<input type='text' onChange={this.handleTroitem} />

                            <br />
                            <br />
                            <Button onClick={this.add}>询问</Button>
                        </div>
                }
            </div>
        )
    }
}
