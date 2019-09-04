import React, {Component} from 'react'
//import Redirect from 'react-dom'
import {
    Form,
    Input,
    Icon,
    Button,
    message
} from 'antd'
import './login.less'
import {reLogin} from '../../api'
import memoryUtil from '../../utils/memoryUtil'
import storageUtil from '../../utils/storageUtil'
const Item = Form.Item
/*登陆路由组件
*/
class Login extends Component {
    handelLogin = (event) => {
        //阻止表单submit自动提交
        event.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log(values)
                const res = await reLogin(values.username,values.password)
                console.log(res)
                if(res.status === 0){
                    const user = res.data
                    message.success('登陆成功');
                    memoryUtil.user = user
                    storageUtil.saveUser(user)
                    this.props.history.replace('/')
                }
            }else{
                console.log('校验失败')
            }
        });

    }
    validatorPWD = (rule, value, callback) => {
        if(!value){
            callback('密码不能为空！')
        }else if(value.length < 4){
            callback('密码最少4位！')
        }else if(value.length > 12){
            callback('密码最多16位！')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文、数字、下划线组成')
        }else{
            callback()
        }

    }
    render() {
        const form = this.props.form
        const {getFieldDecorator} = form
        const user = memoryUtil.user
        console.log('登陆页输出用户信息===》')
        console.log(user)
        if(user._id){
           // return <Redirect to='/'/>
            this.props.history.replace('/')
            return false
        }
        return (
            <div className='login'>
                <header className='login-header'>
                    <h1>React 项目: 后台管理系统</h1>
                </header>
                <div>

                </div>
                <section className='login-content'>
                    <div className='center'>
                        <h3>用户登陆</h3>
                        <Form onSubmit={this.handelLogin} className="login-form">

                            <Item>
                                {getFieldDecorator('username', {
                                    rules: [
                                        { required: true, message: '用户名不能为空！' },
                                        {min: 4,message: '用户名最少4位'},
                                        {max: 12,message: '用户名最多12位'},
                                        {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字、下划线组成'},
                                    ],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="用户名"/>
                                )}
                            </Item>
                            <Item>
                                {getFieldDecorator('password', {
                                    rules: [
                                        { validator: this.validatorPWD},
                                        ],
                                })(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="password" placeholder="密码"/>
                                )}
                            </Item>
                            <Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
                            </Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default  WrappedNormalLoginForm