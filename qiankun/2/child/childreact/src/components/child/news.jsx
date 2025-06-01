/*
 * @Author: chenxuan
 * @Date: 2022-06-05 16:55:28
 * @LastEditTime: 2022-06-19 19:35:07
 * @LastEditors: chenxuan
 */
import React,{Component} from 'react'
class New extends Component{
    render(){
        const {name,id}=this.props.match.params  // params参数
        console.log(this.props.match.params) 
        return(
            <div>
                <h2>this is  New</h2>
                <p>{name}</p>
                <p>{id}</p>
                
            </div>
        )
    }
}
export default New