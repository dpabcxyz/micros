/*
 * @Author: chenxuan
 * @Date: 2022-06-05 16:55:35
 * @LastEditTime: 2022-06-12 23:55:03
 * @LastEditors: chenxuan
 */
import queryString from 'query-string';
import React,{Component} from 'react'
class Car extends Component{
    render(){
        let {search}=this.props.location
        console.log(queryString.parse(search))
        return (
            <div>
                <h2>this is  CAR</h2>
            </div>
        )
        
    }
}
export default Car