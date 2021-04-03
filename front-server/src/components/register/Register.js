import React, { Component } from 'react'

export default class Register extends Component {
    render() {
        return (
            <div>
                手机号：<input type="text"/><br/>
                密码：<input type= "password" /><br/>
                验证码：<input type="password"/><br/>
            <button>登录</button>
            </div>
        )
    }
}
