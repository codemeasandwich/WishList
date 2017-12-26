import { types, flow, applySnapshot, onSnapshot, getSnapshot } from "mobx-state-tree"

import { WishList } from "./WishList"
import { createStorable } from "./Storable"

const User = types.compose(
types.model({
  id:types.identifier(),//types.string,  
  name:types.string,
  gender: types.enumeration("gender",["m","f"]),//types.union(types.literal("m"),types.literal("f"))
  wishList: types.optional(WishList,{}),
  recipient: types.maybe( types.reference( types.late( ()=> User ) ) )
})
.actions(self => ({
 
  getSuggestions:flow(function * (){
    const data = yield fetch(`http://localhost:3001/suggestions_${self.gender}`)
    const suggestions = yield data.json()
     self.wishList.items.push(...suggestions)
  }),
  afterCreate(){
    onSnapshot(self,self.save)
  }
}))
,createStorable("users","id"))

export const Group = types.model({
  users: types.map(User)
})
.actions(self => {
  
  //let controller;
  
  return {
  afterCreate(){
    self.load()
  },
  load: flow(function* load(){
    //controller = window.AboutController()
    try{
      const response = yield fetch(`http://localhost:3001/users`)//,{ signal: controller.signal })
      applySnapshot(self.users, yield response.json())
      console.log("success")
    } catch(e){
      console.warn("abouted",e.name)
    }
  }),
  reload(){
    self.load()
  },
  beforeDestroy(){
   // controller && controller.about()
  },
  drawLots(){
    
    const allUsers = self.users.values()

    // not enough users, bail out
    if (allUsers.length <= 1) {
      return
    }
    
    // not assigned lots    
    let remaining = allUsers.slice()
    
    allUsers.forEach(user => {
      // edge case: the only person without recipient
      // is the same as the only remaining lot
      // swap lot's with some random other person.
      
      if (remaining.length === 1 && remaining[0] === user) {
          const swapWith = allUsers[randNum(allUsers,user)]
          user.recipient = swapWith.recipient
          
      //const iam = user.name
      
      //const giveTo = swapWith.name
          
          swapWith.recipient = user//self//user.id
         // console.log("swapped!")
      } else while (!user.recipient) {
          // Pick random lot from remaing list
          let recipientIdx = Math.floor(Math.random() * remaining.length)
          //If it is not the current user, assign it as recipient
          //and remove the lot
          if (remaining[recipientIdx] === user){
          user.recipient = remaining[recipientIdx].id
          //console.log(user.name, remaining[recipientIdx].name)
          remaining.splice(recipientIdx, 1)
          }
      }
    
    
    
   /* let remaining = self.users.slice()
    self.users.forEach(user => {
      while(true){
        let victimIdx = Math.random(Math.random * remaining.length -
              if (remaining[victimIdx] !== user) {
                //code
              }
      }  
    })*/
  }) // END allUsers.forEach
} // END drawLots
} // END return
}) // END actions
 

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

function randNum(arr,excludeNum){
    var randNumber = Math.floor(Math.random()*arr.length);
    if(arr[randNumber]===excludeNum){
        return randNum(arr,excludeNum);
    }else{
        return randNumber;
    }
}