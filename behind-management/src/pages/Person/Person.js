import React, { Component } from 'react'
import { Alert, Button, DatePicker, Space } from 'antd';
import TextLoop from 'react-text-loop';
import BackImage from '../Person/2.jpg';
const { RangePicker } = DatePicker;
export default class Person extends Component {

    state = {
        data: [],
        id: '',
        name: '',
        classroom: '',
        college: '',
        score: '',
        topic: '',
        workload: '',
        password: '',
        num: ''
    }


    //操作输入password
    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    //操作输入workload
    handleWorkload = (e) => {
        this.setState({
            workload: e.target.value
        })
    }
    //操作输入name
    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    //操作输入classroom
    handleClassroom = (e) => {
        this.setState({
            classroom: e.target.value
        })
    }
    //操作输入college
    handleCollege = (e) => {
        this.setState({
            college: e.target.value
        })
    }
    componentDidMount() {
        var num = localStorage.getItem('userid')
        console.log(num)
        this.setState({
            num: num
        })
        fetch(`http://localhost:3000/api1/stu/${num}`, {
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
    //更新密码
    changePassword = () => {
        var num = localStorage.getItem('userid')
        console.log(num)
        fetch(`http://localhost:3000/api1/updatePassword/${this.state.password}/${num}`).then(
            () => {
                fetch(`http://localhost:3000/api1/stu/${num}`, {
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
    //更新完成度
    changeWorkload = () => {
        var num = localStorage.getItem('userid')
        console.log(num)
        fetch(`http://localhost:3000/api1/updateWorkload/${this.state.workload}/${num}`).then(
            () => {
                fetch(`http://localhost:3000/api1/stu/${num}`, {
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

    //更新名字
    changeName = () => {
        var num = localStorage.getItem('userid')
        console.log(num)
        fetch(`http://localhost:3000/api1/updateName/${this.state.name}/${num}`).then(
            () => {
                fetch(`http://localhost:3000/api1/stu/${num}`, {
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

    //更新班级
    changeClassroom = () => {
        var num = localStorage.getItem('userid')
        console.log(num)
        fetch(`http://localhost:3000/api1/updateClassroom/${this.state.classroom}/${num}`).then(
            () => {
                fetch(`http://localhost:3000/api1/stu/${num}`, {
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

    //更新院系
    changeCollege = () => {
        var num = localStorage.getItem('userid')
        console.log(num)
        fetch(`http://localhost:3000/api1/updateCollege/${this.state.college}/${num}`).then(
            () => {
                fetch(`http://localhost:3000/api1/stu/${num}`, {
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

    //删除
    del = (e) => {
        console.log('执行删除')
        fetch(`http://localhost:3000/api1/deletestu/${this.state.data[e.target.id].id}`).then(
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
        fetch(`http://localhost:3000/api1/addstu/${this.state.id}/${this.state.name}/${this.state.classroom}/${this.state.college}`).then(
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
            <div style={{ width: '100%', overflow: 'scroll', height: '600px', marginTop: '20px'}}>
                {
                    this.state.num < 99 ?
                        <table border="2" style={{ width: '100%', fontFamily: '楷体' }}>
                            <thead>
                                <tr>
                                    <th>教师编号</th>
                                    <th>姓名</th>
                                    <th>班级</th>
                                    <th>院系</th>
                                    {/*<th>毕设选题</th>*/}
                                    {/*<th>操作</th>*/}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.classroom}</td>
                                                <td>软件学院</td>
                                                {/*<td>{item.topic}</td>*/}
                                                {/*<td><button id={index} onClick={this.del}>删除</button></td>*/}
                                            </tr>
                                        )

                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <table border="2" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>学号</th>
                                    <th>姓名</th>
                                    <th>班级</th>
                                    <th>院系</th>
                                    <th>成绩</th>
                                    <th>毕设选题</th>
                                    <th>完成度</th>
                                    {/*<th>操作</th>*/}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.classroom}</td>
                                                <td>{item.college}</td>
                                                <td>{item.score}</td>
                                                <td>{item.topic}</td>
                                                <td>{item.workload}</td>
                                                {/*<td><button id={index} onClick={this.del}>删除</button></td>*/}
                                            </tr>
                                        )

                                    })
                                }
                            </tbody>
                        </table>
                }
                {
                    this.state.num < 99 ?
                        <div style={{ marginTop: '100px' }}>
                            <div style={{ width: '250px' }}><Alert
                                banner
                                message={
                                    <TextLoop mask>
                                        <div>温馨提示：</div>
                                        <div>请合理更改信息！！！</div>
                                        <div>谢谢合作！！！祝您使用愉快</div>
                                    </TextLoop>
                                }
                            />
                            </div>
                            <br />
                            <div style={{ width: '280px', position: 'relative' }}>
                                姓名:<input type='text' onChange={this.handleName} />
                                <Button style={{ marginTop: '5px' }} onClick={this.changeName}>
                                    修改名字
                        </Button>
                                <br />
                                <br />
                    班级:<input type='text' onChange={this.handleClassroom} />
                                <Button style={{ marginTop: '5px' }} onClick={this.changeClassroom}>
                                    修改班级
                        </Button>
                                <br />
                                <br />
                    院系:<input type='text' onChange={this.handleCollege} />
                                <Button style={{ marginTop: '5px' }} onClick={this.changeCollege}>
                                    修改院系
                        </Button>
                                <br />
                                <br />
                                <div style={{ position: 'relative', marginLeft: '280px', width: '280px', marginTop: '-257px' }}>

                                    密码:<input type='text' onChange={this.handlePassword} />
                                    <Button style={{ marginTop: '5px' }} onClick={this.changePassword}>
                                        修改密码
                        </Button>
                                    <Space style={{ marginTop: '10px' }} direction="vertical" size={12}>
                                        <RangePicker
                                            dateRender={current => {
                                                const style = {};
                                                if (current.date() === 1) {
                                                    style.border = '1px solid #1890ff';
                                                    style.borderRadius = '50%';
                                                }
                                                return (
                                                    <div className="ant-picker-cell-inner" style={style}>
                                                        {current.date()}
                                                    </div>
                                                );
                                            }}
                                        />
                                    </Space>
                                截止期限:<input type='text' onChange={this.handlePassword} />
                                    <Button style={{ marginTop: '5px' }} onClick={this.changePassword}>
                                        提交
                        </Button>
                                </div>
                            </div>
                            <br />
                        </div> :
                        <div style={{ marginTop: '100px' }}>
                            <div style={{ width: '250px' }}><Alert
                                banner
                                message={
                                    <TextLoop mask>
                                        <div>温馨提示：</div>
                                        <div>请合理更改信息！！！</div>
                                        <div>谢谢合作！！！祝您使用愉快</div>
                                    </TextLoop>
                                }
                            />
                            </div>
                            <br />
                            <div style={{ width: '280px', position: 'relative' }}>
                                姓名:<input type='text' onChange={this.handleName} />
                                <Button style={{ marginTop: '5px' }} onClick={this.changeName}>
                                    修改名字
                        </Button>
                                <br />
                                <br />
                    班级:<input type='text' onChange={this.handleClassroom} />
                                <Button style={{ marginTop: '5px' }} onClick={this.changeClassroom}>
                                    修改班级
                        </Button>
                                <br />
                                <br />
                    院系:<input type='text' onChange={this.handleCollege} />
                                <Button style={{ marginTop: '5px' }} onClick={this.changeCollege}>
                                    修改院系
                        </Button>
                                <br />
                                <br />
                                <div style={{ position: 'relative', marginLeft: '280px', width: '280px', marginTop: '-257px' }}>
                                    完成度:<input type='text' onChange={this.handleWorkload} />
                                    <Button style={{ marginTop: '5px' }} onClick={this.changeWorkload}>
                                        修改完成度
                        </Button>
                                    <br />
                                    <br />
                    密码:<input type='text' onChange={this.handlePassword} />
                                    <Button style={{ marginTop: '5px' }} onClick={this.changePassword}>
                                        修改密码
                        </Button>

                                </div>
                            </div>
                            <br />
                        </div>}
            </div>
        )
    }
}
