/*
 * @Author: chenxuan
 * @Date: 2022-05-22 22:25:38
 * @LastEditTime: 2022-08-25 00:42:10
 * @LastEditors: chenxuan
 */
import React,{Component} from 'react'
import {Route,Redirect} from 'react-router-dom'
import Car  from './child/code/car'
import New from './child/code/news'
import Money from './child/code/money'
class Home extends Component{
    replace1=()=>{
        this.props.history.replace("/code/news/chenxuan/123")
    }
    replace2=()=>{
        this.props.history.replace("/code/car/?name=chenxuan&id=123456")
    }
    replace3=()=>{
        // this.props.history.replace({pathname:"/code/money",state:{name:"陈轩",age:"18岁",sex:"男"}})
        this.props.history.replace('/code/money',{name:"陈轩",age:"19岁",sex:"男"})
    }
    push1=()=>{
        this.props.history.push("/code/news/chenxuan/123")
    }
    render(){
        return(
            <div className='home'>
                <h1>this is Home</h1>
                <ul className='homeNav'>
                    <button onClick={this.replace1}>replace-params传参</button>
                    <button onClick={this.replace2}>replace-search传参</button>
                    <button onClick={this.replace3}>replace-state传参</button>
                    <button onClick={this.push1}>push-state传参</button>
                </ul>
                <div className='homeContent'>
                    <Route path="/code/news/:name/:id" component={New}/>
                    <Route path="/code/car" component={Car} />
                    <Route path="/code/money" component={Money} />
                    <Redirect to="/code/car" />
                </div>
            </div>
        )
    }
}
export default Home