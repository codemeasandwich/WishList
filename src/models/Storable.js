import { types, applySnapshot, onSnapshot, getSnapshot } from "mobx-state-tree"


export function createStorable(CollectionName, attributeName) {
  return types.model({}).actions(self => ({
   save(){
      fetch(`http://localhost:3001/${CollectionName}/${self[attributeName]}`,{
        method:"PUT",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify(getSnapshot(self))
      })
      .then(result => console.log("Saved"))
      .catch(err => console.error("Problem saving",err))
    }
  }))
}