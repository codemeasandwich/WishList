import { WishList, WishListItem } from "./WishList"

it("can create a instance of a model", () =>{
  const item = WishListItem.create({
      "name":"Cats DVD",
      "price":12.95
    })
  
  expect(item.price).toBe(12.95)
  expect(item.image).toBe("")
})

it("can create a WishList", () =>{
  const list = WishList.create({items:[{
      "name":"Cats DVD",
      "price":12.95
    }]})
  
  expect(list.items.length).toBe(1)
  expect(list.items[0].price).toBe(12.95)
})