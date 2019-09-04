import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {reqWeather} from '../../api'
import {Modal} from 'antd'
import {formateDate}from '../../utils/dateUtils'
import memoryUtil from '../../utils/memoryUtil'
import storageUtil from '../../utils/storageUtil'
import menuList from '../../config/menuConfig'
import './inedx.less'
class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentTime:formateDate(Date.now()),
            dayPictureUrl:'',
            weather:'',
            title:'',
        }
    }
    //获取天气
    getWeather = async () => {
        // 调用接口请求异步获取数据
        const {dayPictureUrl, weather} = await reqWeather('北京')
        // 更新状态
        this.setState({dayPictureUrl, weather})
        console.log(this.state.dayPictureUrl,this.state.weather)
    }
    //获取title
    getTitle(){
        const path = this.props.location.pathname;
        let title;
        menuList.forEach((item)=>{
            if(item.key === path){
              title = item.title
            }else if(item.children){
                const result = item.children.find(child => child.key === path)
                if(result){
                    title = result.title
                }
            }
        })
        return title;

    }
    //退出登陆
    dropOut = () => {
        // 显示确认框
        Modal.confirm({
            content: '确定退出吗?',
            onOk: () => {
                // 删除保存的user数据
                storageUtil.removeUser()
                memoryUtil.user = {}
                // 跳转到login
                this.props.history.replace('/login')
            }
        })
    }
    componentDidMount() {
        this.intervalId = setInterval(()=>{
            var currentTime = formateDate(Date.now())
            this.setState({currentTime})

        },1000)
        this.getWeather()
    }
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
    render() {
        const {currentTime,dayPictureUrl,weather} = this.state
        const title = this.getTitle()
        return(
            <div className='header'>
                <div className='header-top'>
                   <div className='header-top-inner'>
                       <span>欢迎，</span>
                       <span className='middle'>{memoryUtil.user.username}</span>
                       <span className='quit' onClick={this.dropOut}>退出</span>
                   </div>
                </div>
                <div className='header-bottom'>
                    <div className='title'>{title}</div>
                    <div className='header-bottom-inner'>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="天气" className='weather'/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }

}
export default withRouter(Header)