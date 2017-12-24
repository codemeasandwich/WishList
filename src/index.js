import React from 'react';
import ReactDOM from 'react-dom';
import './assets/bootstrap.min.css'; 
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { WishList } from "./models/WishList"
import { onSnapshot } from "mobx-state-tree"

let init = {

  items:[{
      name:"Studio Ghibli Howl's Moving Castle All Year Calendar",
      price:74.99,
      image:"https://images-na.ssl-images-amazon.com/images/I/51%2Bx7t67joL.jpg"
    },{
      name:"Hellsing: Complete",
      price:59.99,
      image:"https://images-na.ssl-images-amazon.com/images/I/51K0BQGC29L.jpg"
    }]
}

if (localStorage.getItem("wishlistapp")) {
  const json = JSON.parse(localStorage.getItem("wishlistapp"))
  if (WishList.is(json)) {
    init = json
  }
}

const wishList = WishList.create(init)
/*
setInterval(()=>{
  wishList.items[0].changePrice(
  wishList.items[0].price + 1 )
  },1000)
*/

onSnapshot(wishList, snapshot => localStorage.setItem("wishlistapp",JSON.stringify(snapshot)))

ReactDOM.render(<App wishList={wishList}/>, document.getElementById('root'));
registerServiceWorker();
