import React, { Component } from 'react'
import { Modal, Button, Input } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined, PlusCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';


export default class Notice extends Component {

    state = {
        data: '',
        content: '',
        num1: '',
        isModal: false
    }

    componentDidMount() {
        var num = localStorage.getItem('userid')
        console.log(num)
        this.setState({
            num1: num
        })
        console.log("通知公告信息")
        fetch(`http://localhost:3000/api1/notice`)
            .then(res => {
                return res.json();
            }).then(
                json => {
                    console.log(json)
                    this.setState({
                        data: json
                    })
                }
            ).then(
                error => {
                    console.log(error)
                }
            )
    }
    //删除通告
    del = (e) => {
        console.log('执行删除')
        console.log(e.currentTarget.id)
        fetch(`http://localhost:3000/api1/deletenotice/${this.state.data[e.currentTarget.id].id}`).then(
            () => {
                fetch(`http://localhost:3000/api1/notice`, {
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
    //发布公告
    add = () => {
        fetch(`http://localhost:3000/api1/addnotice/${this.state.content}`).then(
            () => {
                fetch(`http://localhost:3000/api1/notice`, {
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
                        isModal: !this.state.isModal

                    })
                }).then(
                    error => {
                        console.log(error)
                    }
                )
            }
        )
        alert('发布公告成功！！！')
    }
    //操作输入content
    handleContent = (e) => {
        this.setState({
            content: e.target.value
        })
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
        const data = Array.from(this.state.data);
        const { TextArea } = Input;
        return (
            <div style={{ width: '100%', overflow: 'scroll', height: '600px', marginTop: '20px' }}>
                <Button style={{ marginLeft: '95%' }} type="primary" onClick={this.showModal} disabled={this.state.num1 < 99 ? false :true}>
                    <PlusCircleTwoTone />
                </Button>
                <Modal title="发布通告" visible={this.state.isModal} onOk={this.add} onCancel={this.handleCancel}>
                    通告内容:<TextArea showCount maxLength={100} onChange={this.handleContent} />
                </Modal>
                <table border="2" style={{ width: '100%', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>内容</th>
                            {this.state.num1 < 99 ?
                                <th>删除</th>
                                : null}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.content}</td>
                                        {this.state.num1 < 99 ?
                                            <td><Button id={index} onClick={this.del}><DeleteTwoTone /></Button></td>
                                            : null}
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>

            </div>
        )
    }
}
