import React, { Component } from 'react'
import { Collapse, Checkbox, Modal, Button, Input } from 'antd';
import { DeleteTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
const { Panel } = Collapse;
export default class Project extends Component {
    state = {
        data: [],
        id: '',
        proname: '',
        prohard: '',
        margin: '',
        content: '',
        num1: '',
        isSelectpro: true,
        isModal: false
    }
    //操作输入id
    handleId = (e) => {
        this.setState({
            id: e.target.value
        })
    }
    //操作输入proname
    handleProname = (e) => {
        this.setState({
            proname: e.target.value
        })
    }
    //操作输入prohard
    handleProhard = (e) => {
        this.setState({
            prohard: e.target.value
        })
    }
    //操作输入margin
    handleMargin = (e) => {
        this.setState({
            margin: e.target.value
        })
    }
    //操作输入content
    handleContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    componentDidMount() {
        var num = localStorage.getItem('userid')
        console.log(num)
        this.setState({
            num1: num
        })
        fetch(`http://localhost:3000/api1/pro`, {
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
    //撤销选题
    nopro = (e) => {
        console.log('撤销成功')
        console.log(e.target.id)
        var num = localStorage.getItem('userid')
        console.log(num)
        fetch(`http://localhost:3000/api1/noselectpro/${this.state.data[e.target.id].margin}/${num}`).then(
            () => {
                fetch(`http://localhost:3000/api1/pro`, {
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
                        isSelectpro: !this.state.isSelectpro

                    })
                }).then(
                    error => {
                        console.log(error)
                    }
                )
            }
        )
        alert('撤销成功，如有需要，请重新选题')
    }
    //选题
    addpro = (e) => {
        console.log(e.target.id)
        var num = localStorage.getItem('userid')
        console.log(num)
        fetch(`http://localhost:3000/api1/addproject/${this.state.data[e.target.id].proname}/${this.state.data[e.target.id].margin}/${num}`).then(
            () => {
                fetch(`http://localhost:3000/api1/pro`, {
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
                        isSelectpro: !this.state.isSelectpro

                    })
                }).then(
                    error => {
                        console.log(error)
                    }
                )
            }
        )
        alert('选题成功！！！')
    }
    //删除
    del = (e) => {
        console.log('执行删除')
        console.log(e.currentTarget.id)
        fetch(`http://localhost:3000/api1/deletePro/${this.state.data[e.currentTarget.id].id}`).then(
            () => {
                fetch(`http://localhost:3000/api1/pro`, {
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
    //添加
    add = () => {
        console.log('执行添加')
        fetch(`http://localhost:3000/api1/addPro/${this.state.id}/${this.state.proname}/${this.state.prohard}/${this.state.margin}/${this.state.content}`).then(
            () => {
                fetch(`http://localhost:3000/api1/pro`, {
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
        alert('新增选题成功')
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
        console.log(this.state.data)
        const { TextArea } = Input;
        return (
            <div style={{ width: '100%', overflow: 'scroll', height: '600px', marginTop: '20px', fontFamily: '楷体' }}>
                <table border="2" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>标题</th>
                            <th>程度</th>
                            <th>容量</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>
                                            <Collapse accordion>
                                                <Panel header={item.proname}>
                                                    <span style={{ display: 'inline-block', width: '500px', whiteSpace: 'pre-wrap' }}>{item.content}</span>
                                                </Panel>
                                            </Collapse>
                                        </td>
                                        <td>{item.prohard}</td>
                                        <td>{item.margin}</td>
                                        <td>
                                            <Checkbox id={index} onChange={this.state.isSelectpro ? this.addpro : this.nopro}>选题</Checkbox>
                                            {
                                                this.state.num1 < 99 ?
                                                    <button id={index} onClick={this.del}><DeleteTwoTone /></button> :
                                                    null
                                            }
                                        </td>
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>
                {
                    this.state.num1 < 99 ?
                        <div style={{ marginTop: '100px' }}>
                            <p style={{ fontFamily: '华文彩云', color: 'red' }}>温馨提示：</p>
                            <p style={{ fontFamily: '华文彩云' }}>由于咱们的数据具有唯一性，请在添加时，注意ID不要填写已有ID。谢谢合作！！！祝您使用愉快！！！</p>
                            <Button type="primary" onClick={this.showModal}>
                                <PlusCircleTwoTone />
                            </Button>
                            <Modal title="新增选题" visible={this.state.isModal} onOk={this.add} onCancel={this.handleCancel}>
                                I D:<input type='text' style={{ marginLeft: '11px' }} onChange={this.handleId} /><br /><br />
                            标题:<input type='text' onChange={this.handleProname} /><br /><br />
                            程度:<input type='text' onChange={this.handleProhard} /><br /><br />
                            容量:<input type='text' onChange={this.handleMargin} /><br /><br />
                            介绍:<TextArea showCount maxLength={100} onChange={this.handleContent} />
                            </Modal>
                        </div> :
                        null
                }
            </div>
        )
    }
}