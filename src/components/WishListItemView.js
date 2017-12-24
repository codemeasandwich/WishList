import React from "react"

const WishListItemView = ({item})=>(
  <div class="media">
  <div className="media-left">
  {item.image && <img src={item.image} className="img-thumbnail" style={{width: 100,maxWidth: 100 ,height: 100}}/>}
  </div>
  <div className="media-body">
  <h3 className="media-heading">{item.name}</h3>
  <span class="label label-warning">{item.price}</span>
    </div>
    </div>
)

export default WishListItemView