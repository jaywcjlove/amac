import React,{Component} from 'react'
import menuSource from "../data/"
import Menu from "./menu"


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
              console.log("--->",e,"---2>",key)
              this.setState({contentSource:source})
           }} /> 
        </div>
        <div className="content">
          <header className="header">
          header menu
          </header>

          <div className="article-content">

            content
          </div>
        </div>
      </div>
    )
  }
}
