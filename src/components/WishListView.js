import React from "react"
import { observer } from "mobx-react"

import WishListItemView from "./WishListItemView"
import WishListItemEntry from "./WishListItemEntry"

const WishListView = ({wishList, readonly}) => (
	<div> 
		<ul> {
			wishList.items.map((item, idx) => <WishListItemView key={idx} item={item} readonly={readonly} />)
		} </ul>
  <div className="alert alert-success" role="alert" style={{margin: 20, fontWeight: "bolder"}}>
  Total: €{wishList.totalPrice}
</div>

  { !readonly && <WishListItemEntry wishList={wishList}  readonly={readonly}/> }
  
	</div>
)

export default observer(WishListView)