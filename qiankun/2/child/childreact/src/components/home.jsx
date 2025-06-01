/*
 * @Author: chenxuan
 * @Date: 2022-05-22 22:25:38
 * @LastEditTime: 2022-06-18 15:38:36
 * @LastEditors: chenxuan
 */
import React,{Component} from 'react'
import {Link, Route,Redirect} from 'react-router-dom'
import Car  from './child/car'
import New from './child/news'
import Money from './child/money'
class Home extends Component{
    render(){
        return(
            <div className='home'>
                <h1>this is Home</h1>
                <ul className='homeNav'>
                    <Link replace={true} to="/home/news/chenxuan/123" children="新闻"/>
                    <Link replace={true} to="/home/car/?name=chenxuan&id=123456" children="汽车" />
                    <Link replace={true} to={{pathname:'/home/money',state:{name:"陈轩",age:"18岁",sex:"男"}}} children="财经" />
                </ul>
                <div className='homeContent'>
                    <Route path="/home/news/:name/:id" component={New} /> 
                    <Route path="/home/car" component={Car} />
                    <Route path="/home/money" component={Money} />
                    <Redirect to="/home/car" />
                </div>
            </div>
        )
    }
}
export default Home