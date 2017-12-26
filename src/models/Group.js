import { types, flow } from "mobx-state-tree"

import { WishList } from "./WishList"

const User = types.model({
  id:types.string,  
  name:types.string,
  gender: types.enumeration("gender",["m","f"]),//types.union(types.literal("m"),types.literal("f"))
  wishList: types.optional(WishList,{}),
})
.actions(self => ({
  getSuggestions:flow(function * (){
    const data = yield fetch(`http://localhost:3001/suggestions_${self.gender}`)
    const suggestions = yield data.json()
     self.wishList.items.push(...suggestions)
  }),
/*getSuggestions(){
    fetch(`http://localhost:3001/suggestions_${self.gender}`)
    .then(data => data.json())
    .then(suggestions => self.addSuggestions(suggestions) )
  },
  addSuggestions(suggestions){
     self.wishList.items.push(...suggestions)
  }*/
}))

export const Group = types.model({
  users: types.map(User)
})
 

/*
Example

const Man = types.model({
  id:types.string,  
  name:types.string,
  gender: types.literal("m")
})

const Woman = types.model({
  id:types.string,  
  name:types.string,
  gender: types.literal("m")
})

const Human = types.union(Man,Woman)

const someone = Human.create({
  id:123, name:"tom", gender:"m"
})

console.log(Man.is(someone))   // true
console.log(Woman.is(someone)) // false

*/