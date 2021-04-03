import React, { Component } from 'react'
import { Modal, Button, Input } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined, PlusCircleTwoTone ,DeleteTwoTone} from '@ant-design/icons';


export default class Notice extends Component {

    state = {
        data: '',
        content: '',
        isModal: false
    }

    componentDidMount() {
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
        console.log(e.target.id)
        fetch(`http://localhost:3000/api1/deletenotice/${this.state.data[e.target.id].id}`).then(
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
                <Button style={{marginLeft:'95%'}} type="primary" onClick={this.showModal}>
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
                            <th>删除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.content}</td>
                                        <td><Button id={index} onClick={this.del}><DeleteTwoTone /></Button></td>
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
