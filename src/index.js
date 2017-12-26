import React from 'react';
import ReactDOM from 'react-dom';
import './assets/bootstrap.min.css';


import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { Group } from "./models/Group"
import { onSnapshot, getSnapshot, addMiddleware } from "mobx-state-tree"
/*
let init = {

    users:{
        "a342": { id:"a342", name: "Homer", gender:"m" },
        "5fc2": { id:"5fc2", name: "Marge", gender:"f" },
    }
}
*/


/*
if (localStorage.getItem("wishlistapp")) {
  const json = JSON.parse(localStorage.getItem("wishlistapp"))
  if (WishList.is(json)) {
    init = json
  }
}*/

let group = window.group = Group.create({users:{}})//(init)
//group.load()

addMiddleware(group, (call,next)=>{
 console.log(`[${call}] ${next}`)
 return next(call)
 })

/*
setInterval(()=>{
  wishList.items[0].changePrice(
  wishList.items[0].price + 1 )
  },1000)
*/

//onSnapshot(wishList, snapshot => localStorage.setItem("wishlistapp",JSON.stringify(snapshot)))


function renderApp(){
ReactDOM.render(<App group={group}/>, document.getElementById('root'));
registerServiceWorker();
}

renderApp()

if (module && module.hot) {
  module.hot.accept(["./components/App"],()=>renderApp())
  module.hot.accept(["./models/WishList"],()=>{
    const snapshot = getSnapshot(group)
    group = window.group = Group.create(snapshot)
    renderApp()
  })
}