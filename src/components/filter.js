import React,{Component} from 'react'
import {Icons} from './icon'

export default class Filter extends Component {
  static defaultProps = {
    dataSource:[],
    onClick:new Function
  }
  constructor(props){
    super(props)
    this.state = {
      dataSource:{
        "free":{},
        "hot":{},
        "recommended":{},
        "must-have":{},
        "app-store":{},
        "open-source":{},
      },
      onClick:this.props.onClick,
      selector:"",
    }
  }
  renderListItem(source,onClick){
    let elms = [];
    for(let i in source){
      elms.push(
        <li style={i==this.state.selector?styles.active:styles.cancel} key={i} onClick={()=>{
        }}>
          <Icons type={i}/>
        </li>
      )
    }
    return elms
  }
  render(){
    return (
      <ul className="menu-filter">
        {this.renderListItem(this.state.dataSource,this.props.onClick)}
      </ul>
    )
  }
  componentDidMount(){
    this.setState({dataSource:this.state.dataSource})
  }
}


var styles = {
  active:{
    backgroundColor:"rgba(255, 255, 255, 0.11)"
  },
  cancel:{
    backgroundColor:"transparent"
  }
}