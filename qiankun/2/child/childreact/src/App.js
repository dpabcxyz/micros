/*
 * @Author: chenxuan
 * @Date: 2022-05-22 21:48:34
 * @LastEditTime: 2022-08-23 01:06:03
 * @LastEditors: chenxuan
 */
import React,{Component} from 'react'
import {NavLink,Link,Route,Switch,Redirect} from 'react-router-dom'
import About from './components/about'
import Home from './components/home'
import Test from './components/test'
import Test1 from './components/test1'
import Header from "./components/header"
import  './components/style.css'
class App extends Component{
  render(){
    return(
      <div>
        <div className='nav'>
              {/* <Link to='/about' children="About"/> */}
              {/* <Link to='/about'>About</Link> */}
              <NavLink activeClassName='hehe' to='/home'>Home</NavLink>
              <NavLink to='/test/a/b'>Test</NavLink>
              {/* <NavLink to='/code'>编程式路由</NavLink> */}
        </div>
        <div className='content'>
          <Header/>
          <Switch>
              {/* <Route  path="/about" component={About}/> */}
              <Route  path="/home" component={Home}/>    
              <Route  path="/code" component={Test1}/>
              <Route  exact={false} path="/test" component={Test}/>
              <Redirect to="/home" />
          </Switch>
        </div>
      </div>
      
    )
  }
}
export default App;
