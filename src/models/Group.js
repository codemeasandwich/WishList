import { types, flow, applySnapshot } from "mobx-state-tree"

import { WishList } from "./WishList"

const User = types.model({
  id:types.identifier(),//types.string,  
  name:types.string,
  gender: types.enumeration("gender",["m","f"]),//types.union(types.literal("m"),types.literal("f"))
  wishList: types.optional(WishList,{}),
  recipient: types.maybe( types.reference( types.late( ()=> User ) ) )
})/*
.views(self => ({ 
  get other() { 
   return getParent(self).get(self.recipient)
  }
}))*/
.actions(self => ({
/*  setRecipient(recipient) { 
    self.recipient = recipient.id
  },*/
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
.actions(self => ({
  afterCreate(){
    self.load()
  },
  load: flow(function* load(){
    const response = yield fetch(`http://localhost:3001/users`)
    applySnapshot(self.users, yield response.json())
  }),
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
  })
}}))
 

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