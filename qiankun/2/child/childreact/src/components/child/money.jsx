/*
 * @Author: chenxuan
 * @Date: 2022-06-05 16:55:45
 * @LastEditTime: 2022-06-15 22:05:46
 * @LastEditors: chenxuan
 */
import React,{Component} from 'react'
class Money extends Component{
   
    render(){
        console.log(this.props.location.state)
        return (
            <div>
                <h2>this is  Money</h2>
            </div>
        )
        
    }
}
export default Money