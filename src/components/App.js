import React, { Component } from 'react';
import logo from '../assets/logo.gif';


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
          Wish List</h1><h3>
            <select>
                <option onClick={this.onSelectedUser}>
                - select user -
                </option>
                {
                    group.users.values().map( user => <option key={user.id}
                                                              value={user.id}
                                                              onClick={this.onSelectedUser}
                                                              selected={user.name === this.state.selectedUser}>{user.name}</option> )
                    
                }
            </select></h3>
        </div>
        
      {
        selectedUser && <WishListView wishList={selectedUser.wishList}/>
      }
      </div>);
  }
  
  onSelectedUser = (event) => {
    this.setState({selectedUser:event.target.value})
  }
}

export default App;
