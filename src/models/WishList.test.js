import { WishList, WishListItem } from "./WishList"

it("can create a instance of a model", () =>{
  const item = WishListItem.create({
      "name":"Cats DVD",
      "price":12.95
    })
  
  expect(item.price).toBe(12.95)
  expect(item.image).toBe("")
  item.changeName("Best of Cats")
  expect(item.name).toBe("Best of Cats")
})

it("can create a WishList", () =>{
  const list = WishList.create({items:[{
      "name":"Cats DVD",
      "price":12.95
    }]})
  
  expect(list.items.length).toBe(1)
  expect(list.items[0].price).toBe(12.95)
})

it("can add new items a WishList", () =>{
  const list = WishList.create()
  
  const item = WishListItem.create({
    "name":"Dog VHS",
    "price":2.45
  })
  list.add(item)
  
  expect(list.items.length).toBe(1)
  expect(list.items[0].name).toBe("Dog VHS")
  list.items[0].changeName("The Dog Video")
  expect(list.items[0].name).toBe("The Dog Video")
})