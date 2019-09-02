import React,{Component} from 'react'
import './category.less'
export default class Category extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        console.log(111)
        console.log(this.props.history)
        console.log(this.props.match)
        console.log(this.props.location)
    }

    render() {
        return(
            <div>
               category
            </div>
        )
    }

}