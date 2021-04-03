import React, { Component } from 'react';
import { Collapse, Checkbox, Modal, Button, Input } from 'antd';
import { DeleteTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import logincover from '../images/logincover.jpg'
import { createBrowserHistory, createHashHistory } from 'history';
const history = createHashHistory() // history模式

export default class Login extends Component {
    mylogin = React.createRef()
    myregister = React.createRef()
    mylogin1 = React.createRef()
    myregister1 = React.createRef()
    myregister2 = React.createRef()
    myregister3 = React.createRef()
    myregister4 = React.createRef()
    myregister5 = React.createRef()
    state = {
        data: [],
        isModal: false
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api1/stu`, {
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
                data1: json
            })
        }).then(
            error => {
                console.log(error)
            }
        )

    }

    //登录
    login = () => {
        console.log(this.mylogin.current.value)
        console.log(this.myregister.current.value)
        for (var i = 0; i < this.state.data.length; i++) {
            if (this.mylogin.current.value === this.state.data[i].name &&
                this.myregister.current.value === this.state.data[i].password) {
                alert('登录成功')
                localStorage.setItem('username', this.state.data[i].name)
                var name = localStorage.getItem('username')
                localStorage.setItem('userid', this.state.data[i].id)
                var id = localStorage.getItem('userid')
                history.push('/admin')
                break
            }
        }
    }

    register1 = () => {
        console.log('执行注册')
        fetch(`http://localhost:3000/api1/addstu/${this.myregister4.current.value}/${this.mylogin1.current.value}/${this.myregister3.current.value}/${this.myregister5.current.value}/${this.myregister1.current.value}`).then(
            () => {
                fetch(`http://localhost:3000/api1/stu`, {
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
                        data: json,
                        isModal:!this.state.isModal
                    })
                }).then(
                    error => {
                        console.log(error)
                    }
                )
            }
        )
    }

    //显示modal
    showModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }
    //取消modal
    handleCancel = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }
    render() {
        return (

            <div style={{
                //marginTop:'-37px'
            }}>
                <div style={{
                    marginLeft: '100px'
                }}>
                    <h2 style={{ fontFamily: '华文彩云', color: 'black', fontSize: '50px' }}>
                        毕业设计
                        <span style={{ color: 'black', fontSize: '35px' }}>
                            后台登录
                        </span>
                        <span style={{ fontSize: '20px', fontFamily: '华文行楷', marginLeft: '100px' }}>
                            ——graduation project management system<br />
                        </span>
                    </h2>
                </div>
                <div style={{
                    marginTop: '150px',
                    height: '400px',
                    display: 'flex'
                }}>
                    <div style={{
                        flex: 1,
                        textAlign: 'center'
                    }}>
                        <img src={logincover} alt="cover" />
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ width: '600px', backgroundColor: '#e9eff1', position: 'relative' }}>
                            <div style={{ width: '100px', backgroundColor: '#66d3ee', height: '120px', position: 'absolute', zIndex: 1, marginLeft: '20px', marginTop: '30px' }}>
                                <p style={{ fontSize: '12px', fontFamily: '华文彩云' }}>为了避免不必要的麻烦，请确定确定您的身份是学生！！！谢谢配合hoop to cooperate!!!</p>
                            </div>
                            <div>
                                <p style={{
                                    fontFamily: '楷体'
                                }}>用户登录</p><br />
                                <form onSubmit={this.login} style={{
                                    fontFamily: '楷体'
                                }}>
                                    <label>用户名:<input ref={this.mylogin} type="text" placeholder="请输入用户名或账号" /><br /><br /></label>
                                    <label>密码： <input style={{ marginLeft: '2px' }} ref={this.myregister} type="password" placeholder="请输入密码" /><br /></label>
                                    <input type='submit' value='登录' />
                                    <br />
                                    <Button onClick={this.showModal} style={{ marginLeft: '200px' }}>注册</Button><br />
                                    <Modal style={{
                                        fontFamily: '华文彩云'
                                    }} title="注册" visible={this.state.isModal} onOk={this.register1} onCancel={this.handleCancel}>
                                        <form style={{
                                            fontFamily:'楷体'
                                        }}>
                                            <label>用户名:<input style={{ marginLeft: '13px' }} ref={this.mylogin1} type="text" placeholder="请输入用户名或账号" /><br /><br /></label>
                                            <label>班级:<input style={{ marginLeft: '26px' }} ref={this.myregister3} type="text" placeholder="请输入班级" /><br /><br /></label>
                                            <label>序号:<input style={{ marginLeft: '26px' }} ref={this.myregister4} type="text" placeholder="请输入序号" /><br /><br /></label>
                                            <label>学院:<input style={{ marginLeft: '26px' }} ref={this.myregister5} type="text" placeholder="请输入学院" /><br /><br /></label>
                                            <label>密码：  <input style={{ marginLeft: '15px' }} ref={this.myregister1} type="password" placeholder="请输入密码" /><br /><br /></label>
                                            <label>重复密码:<input style={{ marginLeft: '0px' }} ref={this.myregister2} type="password" placeholder="请输入密码" /><br /></label>
                                        </form>
                                    </Modal>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: '华文行楷' }}>Welcome to the graduation project management system !!!</p>
                </div>
            </div>
        )
    }
}