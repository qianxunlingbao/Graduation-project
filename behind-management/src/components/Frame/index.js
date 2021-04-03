import React from 'react'
import { Layout, Menu, Breadcrumb ,Button} from 'antd';
import Icon ,{LoginOutlined} from '@ant-design/icons';
import logo from './pokemon.svg'
import './index.css'
import { adminRoutes, mainRoutes } from '../../routes';
import { withRouter } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
function index(props) {
    const name = localStorage.getItem('username')
    return (
        <Layout>
            <Header className="header">
                <img src={logo} className="logo" />
                <p style={{ marginLeft: '100px', fontFamily: '华文彩云', fontSize: '40px' }}>皮卡丘毕业设计后台管理
                    <span style={{marginLeft:'500px',fontSize:'25px',fontFamily:'楷体'}}>{name}<Button onClick={p=>props.history.push('/login')}><LoginOutlined /></Button></span>
                </p>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                       {adminRoutes.map(route=>{
                           return(
                               <Menu.Item 
                                    key={route.path}
                                    onClick={p => props.history.push(p.key)}
                                    icon={route.icon}
                               >
                                   {route.title}
                               </Menu.Item>
                           )
                       })}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '16px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default withRouter(index)
