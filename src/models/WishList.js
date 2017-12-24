import { types, getParent, destroy } from "mobx-state-tree"

const data = {
  "name":"Cats DVD",
  "price":12.95,
  "image":"http://thecatapi.com/?id=4jm"
}

export const WishListItem = types
.model({
  name:  types.string,
  price: types.number,
  image: ""
})
.actions(self => ({
  changeName(newName) {
    self.name = newName
  },
  changePrice(newPrice) {
    self.price = newPrice
  },
  changeImage(newImage) {
    self.image = newImage
  },
  remove(){
    getParent(self,2).remove(self)
  },
  
}))

export const WishList = types
.model({
  items: types.optional(types.array(WishListItem),[]),
  //totalPrice: types.number
})
.actions(self => ({
  add(item) {
    self.items.push(item)
  },
  remove(item){
    destroy(item)
  },
  
}))
.views(self => ({
  get totalPrice(){
    return self.items.reduce((sum,entry)=> sum+entry.price,0)
  }
}))