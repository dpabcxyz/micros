/*
 * @Author: chenxuan
 * @Date: 2022-06-05 16:55:28
 * @LastEditTime: 2022-06-18 18:16:55
 * @LastEditors: chenxuan
 */
import {Component} from 'react'
class New extends Component{
    render(){
        const {name,id}=this.props.match.params
        console.log(name,id)
        return(
            <div>
                <h2>this is  New</h2>
            </div>
        )
    }
}
export default New