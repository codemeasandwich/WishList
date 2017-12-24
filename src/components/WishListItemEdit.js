import React, { Component } from "react"
import { observer } from "mobx-react"

class WishListItemEdit extends Component {
  render(){
    const { item } = this.props
    
    
    return <div className="form-horizontal">
              <div className="form-group">
                <label for="inputEmail3" className="col-sm-2 control-label">Things</label>
                <div className="col-sm-10">
                  <input className="form-control" value={item.name} onChange={this.onNameChange}/>
                </div>
              </div>
              <div className="form-group">
                <label for="inputPassword3" className="col-sm-2 control-label">Price</label>
                <div className="col-sm-10">
                  <input className="form-control" value={item.price} onChange={this.onPriceChange}/>
                </div>
              </div>
            </div>
  }
  
  onNameChange = event => {
    this.props.item.changeName(event.target.value)
  }
  
  onPriceChange = event => {
    const newPrice = event.target.value
    if(!isNaN(+newPrice)) 
    this.props.item.changePrice(+newPrice)
  }
  
  onImageChange = event => {
    this.props.item.changeImage(event.target.value)
  }
}

export default observer(WishListItemEdit)