import React,{Component} from 'react'
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import NotFound from './components/404'
export default class App extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>{/*之匹配其中一个*/}
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                    <Route path='/404' component={NotFound}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}