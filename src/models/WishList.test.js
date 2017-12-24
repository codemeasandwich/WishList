import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree"
import { reaction } from "mobx"
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
  const list = WishList.create();
  const states = [];
  
  onSnapshot(list, snapshot => {
    states.push(snapshot)  
  })
  
  const item = {
    "name":"Dog VHS",
    "price":2.45
  }
  list.add(item)
  
  expect(list.items.length).toBe(1)
  expect(list.items[0].name).toBe("Dog VHS")
  list.items[0].changeName("The Dog Video")
  expect(list.items[0].name).toBe("The Dog Video")
  
  expect(getSnapshot(list)).toMatchSnapshot() 
  expect(states).toMatchSnapshot() 
})

it("can add new items a WishList - 2", () =>{
  const list = WishList.create();
  const patchs = [];
  
  onPatch(list, patch => {
    patchs.push(patch)  
  })
  
  const item = {
    "name":"Dog VHS",
    "price":2.45
  }
  list.add(item)
  
  list.items[0].changeName("The Dog Video")
  
  expect(patchs).toMatchSnapshot() 
})

it("can calculate the total price of a wishlist",()=>{
  const list = WishList.create({
      items: [
       {
        image: "",
        name: "Dog VHS",
        price: 2.45,
      },
       {
        image: "",
        name: "The Dog Video",
        price: 2.45,
      }]
  });
  expect(list.totalPrice).toBe(4.90)
  
  let changed = 0
  reaction(()=> list.totalPrice, ()=> changed++)
  
  expect(changed).toBe(0)
  console.log(list.totalPrice)
  list.items[0].changeName("Test")
  expect(changed).toBe(0)
  list.items[0].changePrice(10)
  expect(changed).toBe(1)
})