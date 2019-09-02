import React,{Component} from 'react'
import './inedx.less'
export default class Header extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
        this.goNotFound = this.goNotFound.bind(this)
    }
    goNotFound(){
        console.log(this.props)
        //this.props.history.push('/404?id=1')
    }
    render() {
        return(
            <div className='header'>
                Header
                <button onClick={this.goNotFound}>跳转至404页面</button>
            </div>
        )
    }

}