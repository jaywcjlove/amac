import React,{Component} from 'react';

export default class Menu extends Component {
  static defaultProps = {
    dataSource:[],
    onClick:new Function
  }
  constructor(props){
    super(props)
    this.state = {
      dataSource:this.props.dataSource,
      onClick:this.props.onClick,
      selector:"",
    }
  }
  renderListItem(source,onClick){
    let elms = [];
    for(let i in source){
      elms.push(<li style={i==this.state.selector?styles.active:styles.cancel} key={i} onClick={()=>{
        this.setState({selector:i});
        onClick&&onClick(i,source[i])
      }}>{source[i].title}</li>)
    }
    return elms
  }
  render(){
    return (
      <ul className="menu-list">
        {this.renderListItem(this.props.dataSource,this.props.onClick)}
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