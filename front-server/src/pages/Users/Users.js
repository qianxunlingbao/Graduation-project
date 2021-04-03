import React, { Component, useEffect, useState } from 'react'
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

export default class Users extends Component {

    state = {
        data: [],
        id: '',
        username: '',
        userpassword: '',
        image: ''
    }

    //操作输入id
    handleId = (e) => {
        this.setState({
            id: e.target.value
        })
    }
    //操作输入username
    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    //操作输入userpassword
    handleUserpassword = (e) => {
        this.setState({
            userpassword: e.target.value
        })
    }
    componentDidMount() {
        fetch(`http://localhost:3000/api1/users`, {
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
        fetch(`http://localhost:3000/api1/deleteUsers/${this.state.data[e.target.id].id}`).then(
            () => {
                fetch(`http://localhost:3000/api1/users`, {
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

    //添加
    add = () => {
        console.log('执行添加')
        fetch(`http://localhost:3000/api1/addUser/${this.state.id}/${this.state.username}/${this.state.userpassword}`).then(
            () => {
                fetch(`http://localhost:3000/api1/users`, {
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

    //更新
    update = () => {

    }

    onGetFile = (e) => {


    };

    render() {
        return (
            <div style={{ width: '100%', overflow: 'scroll', height: '600px', marginTop: '20px' }}>
                <table border="2" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>用户ID</th>
                            <th>用户名称</th>
                            <th>用户密码</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.username}</td>
                                        <td>{item.userpassword}</td>
                                        <td><button id={index} onClick={this.del}>删除</button></td>
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>
                <div style={{ marginTop: '100px' }}>
                    <p style={{ fontFamily: '华文彩云', color: 'red' }}>温馨提示：</p>
                    <p style={{ fontFamily: '华文彩云' }}>由于咱们的数据具有唯一性，请在添加时，注意ID不要填写已有ID。谢谢合作！！！祝您使用愉快！！！</p>
                    用户ID:<input type='text' onChange={this.handleId} />
                    用户名称:<input type='text' onChange={this.handleUsername} />
                    用户密码:<input type='text' onChange={this.handleUserpassword} />

                    <br />
                    <br />
                    <button onClick={this.add}>添加</button>
                </div>
            </div>
        )
    }
}
