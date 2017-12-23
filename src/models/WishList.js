import { types } from "mobx-state-tree"

const data = {
  "name":"Cats DVD",
  "price":12.95,
  "image":"http://thecatapi.com/?id=4jm"
}

export const WishListItem = types.model({
  name:  types.string,
  price: types.number,
  image: ""
})

export const WishList = types.model({
  items: types.optional(types.array(WishListItem),[])
})