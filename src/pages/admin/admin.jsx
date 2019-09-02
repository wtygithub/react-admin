import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from '../../components/left_nav'
import Header from '../../components/header'
import memoryUtil from '../../utils/memoryUtil'
import Home from '../../pages/home/home'
import Product from '../../pages/product/product'
import Category from '../../pages/category/category'
import User from '../../pages/user/user'
import Role from '../../pages/role/role'
import Bar from '../../pages/charts/bar'
import Line from '../../pages/charts/line'
import Pie from '../../pages/charts/pie'
import './admin.less'
const {Footer, Sider, Content } = Layout;
export default class Admin extends Component{
    render() {
        const user = memoryUtil.user
        console.log('admin====>')
        console.log(user)
        if(!user._id){
           // return <Redirect to='/login'/>

            this.props.history.replace('/login')
            return false
        }

        return(
            <div className="mainPage">
                <Layout className="layoutWrap">
                    <Sider>
                        <LeftNav/>
                    </Sider>
                    <Layout>
                        <Header></Header>
                        <Content style={{backgroundColor: 'white'}}>
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <Route path='/category/:id' component={Category}/>
                                <Route path='/product' component={Product}/>
                                <Route path='/role' component={Role}/>
                                <Route path='/user' component={User}/>
                                <Route path='/charts/bar' component={Bar}/>
                                <Route path='/charts/line' component={Line}/>
                                <Route path='/charts/pie' component={Pie}/>
                                <Redirect to='/home' />
                            </Switch>
                        </Content>
                        <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                    </Layout>
                </Layout>
            </div>
        )

    }

}
