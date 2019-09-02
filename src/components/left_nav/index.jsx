import './index.less'
import menuList from '../../config/menuConfig'
import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import logo from '../../assets/images/logo.jpg'
import { Menu, Icon} from 'antd';
const { SubMenu }  = Menu;

class LeftNav extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    getMenuNodes_map = (menuList) => {
        var  path = this.props.location.pathname
        return (
            menuList.map(item => {
                if(!item.children) {
                    return (
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                } else {
                    const subMenuPath = item.children.find(citem => item.key == path)
                    if(subMenuPath){
                        this.openKey = item.key
                    }
                    return (
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                              <Icon type={item.icon}/>
                              <span>{item.title}</span>
                            </span>
                            }
                        >
                            {this.getMenuNodes_map(item.children)}
                        </SubMenu>
                    )
                }

            })
        )
    }

    componentWillMount() {
        this.menNodes = this.getMenuNodes_map(menuList)
    }

    render() {
        const  path = this.props.location.pathname
        const  openKey = this.openKey

        return(
            <div className="left-nav">

                <div className="nav_header">
                    <Link to='/'>
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>

                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >

                    {
                        this.menNodes
                    }

                </Menu>
            </div>
        )
    }

}
//高阶函数 用来包装非路由组件，向非路由组件传递3个属性: history/location/match
export default withRouter(LeftNav)