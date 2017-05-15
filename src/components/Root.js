import React,{Component} from 'react'
import menuSource from "../data/"
import Menu from "./menu"
import Filter from "./filter"


export default class Root extends Component{
  constructor(props){
    super(props)
    this.state = {
      contentSource:[]
    }
  }
  render(){
    return(
      <div className="container">
        <div className="menu">
           <Menu dataSource={menuSource.data} onClick={(e,key)=>{
              let source = []
              if(key&&menuSource.data&&menuSource.data[key]&&menuSource.data[key].data){
                source = menuSource.data[key].data;
              }else{
                source = [];
              }
              this.setState({contentSource:source})
           }} /> 
        </div>
        <div className="content">
          <header className="header">
            <Filter />
          </header>

          <div className="article-content">

            content
          </div>
        </div>
      </div>
    )
  }
}
