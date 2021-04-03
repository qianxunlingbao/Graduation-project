import React, { Component } from 'react'
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import man from './1.jpg'
const mystyle = {
    width:'100px',
    height:'100px' 
}
export default class Flie extends Component {

    state = {
        data:''
    }

    componentDidMount(){
        fetch(`http://localhost:3000/api1/public/images`)
        .then(
            res => {
                return res.json();
            }).then(json => {
                console.log(json)
                this.setState({
                    data: json
                })
            })
        .then(
            error => {
                console.log(error)
            }
        )
    }

    render() {
        const data = Array.from(this.state.data);
        return (
            <div style={{ width: '100%', overflow: 'scroll', height: '600px', marginTop: '20px' }}>
                <div style={{ marginLeft: '-800px' }}>
                    <form action="/file_upload" method="post" enctype="multipart/form-data">
                        <input type="file" name="image" size="50" />
                        <br />
                        <input icon={<UploadOutlined />} type="submit" value="上传文件" />
                        <iframe name="hideUrl" style={{ width: '0px', height: '0px', visibility: 'hidden' }}></iframe>
                    </form>
                </div>
                <div style={{width:'300px',marginTop:'50px'}}>
                {
                    data.map((item,index)=>{
                        return(
                            <li style={{marginBottom:'10px',textAlign:'left',marginLeft:'50px'}}><a style={{color:'black'}} href={`http://localhost:3000/api1/public/images/${item}`} key={index}>{item}</a></li>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}
