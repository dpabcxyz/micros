/*
 * @Author: chenxuan
 * @Date: 2022-06-18 18:14:12
 * @LastEditTime: 2022-06-18 18:38:02
 * @LastEditors: chenxuan
 */
import { Component } from "react"
import {withRouter} from 'react-router-dom'
class Header extends Component{
    back=()=>{
        this.props.history.goBack()
    }
    forward=()=>{
        this.props.history.goForward()
    }
    go=()=>{
        this.props.history.go(-2)
    }
    push1=()=>{
        this.props.history.push('/home/news/chenxuan/123')
    }
    push2=()=>{
        this.props.history.push('/home/car?name=chenxuan&id=123456')
    }
    replace1=()=>{
        this.props.history.replace('/home/money')
    }
    replace2=()=>{
        this.props.history.replace('/home/money',{name:"陈轩",age:"18岁",sex:"男"})
    }
    render(){
        return(
            <div className="header">
                <h1>React route演示案例</h1>
                <button onClick={this.back}>前进</button>
                <button onClick={this.forward}>后退</button>
                <button onClick={this.go}>后退2步骤</button>
                <button onClick={this.push1}>push1-params</button>
                <button onClick={this.push2}>push2-search</button>
                <button onClick={this.replace1}>replace1</button>
                <button onClick={this.replace2}>replace2-state</button>
            </div>
        )
    }
}
export default  withRouter(Header)