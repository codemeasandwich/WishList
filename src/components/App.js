import React, { Component } from 'react';
import logo from '../assets/logo.gif';
import { observer } from "mobx-react"


import WishListView from "./WishListView"

class App extends Component {
  
  constructor(props){
    super()
    this.state = { selectedUser: null }
  }
  
  render() {
        
    const { group } = this.props
    const selectedUser = group.users.get(this.state.selectedUser)
    return (
      <div className="App">
        <div className="jumbotron"><h1 className="App-title">
          <img src={logo} className="App-logo" alt="logo" style={{width:250}}/>
          Wish List</h1><h3><button onClick={group.reload}>
            Reload
            </button>
            <select value={this.state.selectedUser||""}>
                <option onClick={this.onSelectedUser}>
                - select user -
                </option>
                {
                    group.users.values().map( user => <option key={user.id}
                                                              value={user.id}
                                                              onClick={this.onSelectedUser}>{user.name}</option> )
                }
            </select>
            <button onClick={group.drawLots}>
            Draw lots
            </button>
            </h3>
        </div>
        
      {
        selectedUser && <WishListView wishList={selectedUser.wishList}/>
      }{
        selectedUser && <button onClick={selectedUser.getSuggestions}>Suggestions</button>
      }
      <h2>
      { selectedUser && selectedUser.recipient ? "recipient: "+selectedUser.recipient.name : "" }
      </h2>
      {
        selectedUser && selectedUser.recipient && <WishListView wishList={selectedUser.recipient.wishList} readonly/>
      }
      
      
      </div>);
  }
  
  onSelectedUser = (event) => {
    this.setState({selectedUser:event.target.value})
  }
}

export default observer(App);
