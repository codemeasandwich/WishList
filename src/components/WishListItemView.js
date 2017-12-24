import React, { Component } from "react"
import { observer } from "mobx-react"
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree"
import WishListItemEdit from "./WishListItemEdit"

class WishListItemView extends Component {
  constructor(){
    super()
    this.state = { isEditing:false }
  }
  render(){
    const {item} = this.props;
    
    if (this.state.isEditing) {
      return    <div className="media">
                  <div className="media-left">
                    {item.image && <img src={item.image} className="img-thumbnail" style={{width: 100,maxWidth: 100 ,height: 100}}/>}
                  </div>
                  <div className="media-body">
                      <WishListItemEdit item={this.state.clone} /> 
                  </div>
                  <div className="media-right" style={{paddingRight: 10}}>
                  <div class="btn-group" role="group" style={{width: 100}}>
                  
                      <button className="btn btn-info" style={{fontSize: "x-large"}} onClick={this.onSaveEdit}>🖬</button>
                      <button className="btn btn-danger" style={{fontSize: "x-large"}} onClick={this.onCancelEdit}>✘</button>
                  </div>
                  </div>
                </div>
    }
    
    return (
    <div className="media">
      <div className="media-left">
        {item.image && <img src={item.image} className="img-thumbnail" style={{width: 100,maxWidth: 100 ,height: 100}}/>}
      </div>
      <div className="media-body">
        <h3 className="media-heading">{item.name}</h3>
        <span class="label label-warning">{item.price}</span>
      </div>
      <div className="media-right" style={{paddingRight: 10}}>
       <button className="btn btn-primary" style={{fontSize: "x-large"}} onClick={this.onToggleEdit}> ✎ </button>
      </div>
    </div>)
  }
  
  onToggleEdit =  () => {
    this.setState({
      isEditing:true,
      clone: clone(this.props.item)
      })
  }
  onCancelEdit =  () => {
    this.setState({  isEditing:false })
  }
  onSaveEdit =  () => {
      applySnapshot(this.props.item, getSnapshot(this.state.clone))
      this.setState({
        isEditing:false,
        clone:null
        })
  }
}



export default observer(WishListItemView)