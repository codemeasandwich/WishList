import React from 'react';
import ReactDOM from 'react-dom';
import './assets/bootstrap.min.css'; 
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { WishList } from "./models/WishList"

const wishList = WishList.create({

  items:[{
      name:"Studio Ghibli Howl's Moving Castle All Year Calendar",
      price:74.99,
      image:"https://images-na.ssl-images-amazon.com/images/I/51%2Bx7t67joL.jpg"
    },{
      name:"Hellsing: Complete",
      price:59.99,
      image:"https://images-na.ssl-images-amazon.com/images/I/51K0BQGC29L.jpg"
    }]
})
/*
setInterval(()=>{
  wishList.items[0].changePrice(
  wishList.items[0].price + 1 )
  },1000)
*/
ReactDOM.render(<App wishList={wishList}/>, document.getElementById('root'));
registerServiceWorker();
