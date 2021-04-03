import React, { Component } from 'react'
import '../App.css';
import './whole.css';
import { Divider } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { Link, NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history';
import { Button } from 'antd';
import Stu from '../pages/Stu/Stu'
import Project from '../pages/Project/Project'
import Trouble from '../pages/Trouble/Trouble';
import Users from './Person/Person'
import Check from '../pages/Check/Check'
import Flie from '../pages/Flie/Flie'
import Notice from '../pages/Notice/Notice'
import Login from '../components/login/login';
import logo1 from '../pokemon.svg'
const history = createBrowserHistory() // history模式
export default class Whole extends Component {
    state = {
        stu: '学生',
        tea: '老师',
        num1: 0,
        name1: ''
    }
    componentDidMount() {
        var num = localStorage.getItem('userid')
        console.log(num)
        var name = localStorage.getItem('username')
        console.log(name)
        this.setState({
            num1: num,
            name1: name
        })
    }
    Back = () => {
        history.push('/login')
    }
    render() {
        return (
            <div>
                <div style={{
                    marginLeft: '100px',
                    //marginTop: '-40px'
                }}>
                    <img alt="logo" className="logo" src={logo1} />
                    <h2 style={{ fontFamily: '华文彩云', color: 'white', fontSize: '50px' }}>
                        毕业设计
                        系统
                        <span style={{ fontSize: '20px', fontFamily: '华文行楷', marginLeft: '100px' }}>
                            ——graduation project management system
                        </span>
                        <span style={{ fontSize: '20px', fontFamily: '华文行楷', marginLeft: '100px' }}>欢迎用户:{this.state.name1}</span>
                        <span style={{ fontSize: '20px', fontFamily: '华文行楷', marginLeft: '20px' }}>身份:{
                            this.state.num1 < 99 ? this.state.tea : this.state.stu
                        }</span>
                        <span style={{ marginLeft: '10px' }}>
                            <a href="http://localhost:3000"><Button onClick={this.Back} size="small">
                                <RollbackOutlined />
                            </Button>
                            </a>
                        </span>
                    </h2>

                </div>
                {/*编写路由链接*/}
                <div style={{ width: '150px', textAlign: 'center', position: 'absolute',fontFamily:'楷体'}}>
                    <NavLink to="/whole/project" activeStyle={{ color: 'white' }} 
                        style={{ 
                            textDecoration: 'none', 
                            backgroundColor: 'transparent', 
                            color: 'black', 
                            fontSize: '20px'
                        }}>选题</NavLink><Divider />
                    <NavLink to="/whole/users" activeStyle={{ color: 'white' }} style={{ textDecoration: 'none', backgroundColor: 'transparent', color: 'black', fontSize: '20px' }}>个人信息</NavLink><Divider />
                     <NavLink to="/whole/trouble" activeStyle={{ color: 'white' }} style={{ textDecoration: 'none', backgroundColor: 'transparent', color: 'black', fontSize: '20px' }}>答疑</NavLink><Divider />
                     <NavLink to="/whole/check" activeStyle={{ color: 'white' }} style={{ textDecoration: 'none', backgroundColor: 'transparent', color: 'black', fontSize: '20px' }}>查询</NavLink><Divider />
                    <NavLink to="/whole/notice" activeStyle={{ color: 'white' }} style={{ textDecoration: 'none', backgroundColor: 'transparent', color: 'black', fontSize: '20px' }}>通知公告</NavLink><Divider />
                     <NavLink disabled={this.state.num1 < 99 ? false : true} to="/whole/stu" activeStyle={{ color: 'white' }} style={{ textDecoration: 'none', backgroundColor: 'transparent', color: this.state.num1 < 99 ? 'black' : 'gray', fontSize: '20px' }}>学生管理</NavLink><Divider />
                    <NavLink disabled={this.state.num1 < 99 ? true : false} to="/whole/file" activeStyle={{ color: 'white' }} style={{ textDecoration: 'none', backgroundColor: 'transparent', color: this.state.num1 < 99 ? 'gray' : 'black', fontSize: '20px' }}>文件上传</NavLink>
                </div>
                <div style={{ width: '1200px', textAlign: 'center', margin: '0 auto' }}>
                    <div style={{ width: '1200px', textAlign: 'center', margin: '0 auto' }}></div>
                    {/*注册路由 */}
                    <Switch>
                        <Route path="/whole/users" component={Users} />
                        <Route exact path="/" component={Login} />
                        <Route path="/whole/project" component={Project} />
                        <Route path="/whole/trouble" component={Trouble} />
                        <Route path="/whole/stu" component={Stu} />
                        <Route path="/whole/notice" component={Notice} />
                        <Route path="/whole/check" component={Check} />
                        <Route path="/whole/file" component={Flie} />
                        <Redirect to='/' />
                    </Switch>
                </div>
            </div>


        )
    }
}
