import React from "react"
import { observer } from "mobx-react"

import WishListItemView from "./WishListItemView"

const WishListView = ({wishList}) => (
	<div> 
		<ul> {
			wishList.items.map((item, idx) => <WishListItemView key={idx} item={item} />)
		} </ul>
  <div class="alert alert-success" role="alert" style={{margin: 20, fontWeight: "bolder"}}>
  Total: {wishList.totalPrice}
</div>

  
	</div>
)

export default observer(WishListView)