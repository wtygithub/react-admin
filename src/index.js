import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import memoryUtil from './utils/memoryUtil'
import storageUtil from './utils/storageUtil'
const user = storageUtil.getUser()
console.log('从local中取user')
console.log(user)
if(user._id){
    memoryUtil.user = user
}
ReactDom.render(<App />, document.getElementById('root'))