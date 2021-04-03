import React, { Component } from 'react'
import { Modal, Button,Input } from 'antd';
import { DeleteTwoTone,PlusCircleTwoTone } from '@ant-design/icons';
export default class Stu extends Component {

    state = {
        data:[],
        id:'',
        name:'',
        classroom:'',
        college:'',
        score:'',
        topic:'',
        workload:'',
        password:'',
        isModal:false
    }

    //操作输入id
    handleId = (e)=>{
        this.setState({
            id:e.target.value
        })
    }
    //操作输入name
    handleName = (e)=>{
        this.setState({
            name:e.target.value
        })
    }
    //操作输入classroom
    handleClassroom = (e)=>{
        this.setState({
            classroom:e.target.value
        })
    }
    //操作输入college
    handleCollege = (e)=>{
        this.setState({
            college:e.target.value
        })
    }
    //操作输入password
    handlePassword = (e)=>{
        this.setState({
            password:e.target.value
        })
    }
    componentDidMount(){
        fetch(`http://localhost:3000/api1/sturange`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(json => {
            //console.log(json)
            this.setState({
                data:json
            })
        }).then(
            error=>{
                console.log(error)
            }
        )
        
    }

    //删除
    del =(e)=>{
        console.log('执行删除')
        fetch(`http://localhost:3000/api1/deletestu/${this.state.data[e.currentTarget.id].id}`).then(
            ()=>{
                fetch(`http://localhost:3000/api1/sturange`,{
                    method:'GET',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    }
                }).then(res => {
                    return res.json();
                }).then(json => {
                    //console.log(json)
                    this.setState({
                        data:json
                    })
                }).then(
                    error=>{
                        console.log(error)
                    }
                )
            }
        )
    }

    //添加
    add = ()=>{
        console.log('执行添加')
        fetch(`http://localhost:3000/api1/addstu/${this.state.id}/${this.state.name}/${this.state.classroom}/${this.state.college}/${this.state.password}`).then(
            ()=>{
                fetch(`http://localhost:3000/api1/sturange`,{
                    method:'GET',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    }
                }).then(res => {
                    return res.json();
                }).then(json => {
                    console.log(json)
                    this.setState({
                        data:json,
                        isModal:!this.state.isModal
                    })
                }).then(
                    error=>{
                        console.log(error)
                    }
                )
            }
        )
    }
     //显示modal
     showModal = ()=>{
        this.setState({
            isModal:!this.state.isModal
        })
    }
    //取消modal
    handleCancel = ()=>{
        this.setState({
            isModal:!this.state.isModal
        })
    }
    render() {
        return (
            <div style={{width:'100%',overflow:'scroll',height:'600px',marginTop:'20px'}}>
                <table border="2" style={{width:'100%',fontFamily:'楷体'}}>
                    <thead>
                        <tr>
                            <th>学号</th>
                            <th>姓名</th>
                            <th>班级</th>
                            <th>院系</th>
                            <th>成绩</th>
                            <th>毕设选题</th>
                            <th>完成度</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map((item,index) => {
                            return(
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.classroom}</td>
                                    <td>{item.college}</td>
                                    <td>{item.score}</td>
                                    <td>{item.topic}</td>
                                    <td>{item.workload}</td>
                                    <td><button id={index} onClick={this.del}><DeleteTwoTone/></button></td>
                                </tr>
                            )
                            
                        })
                    }
                    </tbody>
                </table>
                <div style={{marginTop:'100px'}}>
                    <p style={{fontFamily:'华文彩云',color:'red'}}>温馨提示：</p>
                    <p style={{fontFamily:'华文彩云'}}>由于咱们的数据具有唯一性，请在添加时，注意ID不要填写已有ID。谢谢合作！！！祝您使用愉快！！！</p>
                    <Button type="primary" onClick={this.showModal}>
                            <PlusCircleTwoTone />
                        </Button>
                    <Modal style={{fontFamily:'楷体'}} title="新增学生" visible={this.state.isModal} onOk={this.add} onCancel={this.handleCancel}>
                    学号:<input type='text' onChange={this.handleId} /><br/><br/>
                    姓名:<input type='text' onChange={this.handleName} /><br/><br/>
                    班级:<input type='text' onChange={this.handleClassroom} /><br/><br/>
                    院系:<input type='text' onChange={this.handleCollege} /><br/><br/>
                    密码:<input type='text' onChange={this.handlePassword} /><br/><br/>
                    </Modal>
                    <br/>
                    <br/>
                </div>      
            </div>
        )
    }
}
