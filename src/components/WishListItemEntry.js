import React, { Component } from "react"
import { observer } from "mobx-react"

import WishListItemEdit from "./WishListItemEdit"

import { WishListItem } from "../models/WishList"

class WishListItemEntry extends Component{
  constructor(){
    super()
    this.state = {
      entry:WishListItem.create({ name:"", price:0 })
    }
  }
  render(){
    return (
        <div className="media">
                  <div className="media-body">
        <WishListItemEdit item={this.state.entry} />
                  </div>
                  <div className="media-right" style={{paddingRight: 10}}>
                  <div className="btn-group" role="group" style={{width: 100}}>
                      <button className="btn btn-info" style={{fontSize: "x-large"}} onClick={this.onAdd}>🖬</button>
                  </div>
                  </div>
                </div>
    )
  }
  
  onAdd = () => {
    this.props.wishList.add(this.state.entry)
    this.setState({
        entry: WishListItem.create({ name:"", price:0 })
    })
  }
}

export default WishListItemEntry