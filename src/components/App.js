import React, { Component } from 'react';
import logo from '../assets/logo.gif';


import WishListView from "./WishListView"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="jumbotron"><h1 className="App-title">
          <img src={logo} className="App-logo" alt="logo" style={{width:250}}/>
          Wish List</h1>
        </div>
        <WishListView wishList={this.props.wishList}/>
      </div>
    );
  }
}

export default App;
