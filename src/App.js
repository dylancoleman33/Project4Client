import React, { Component } from 'react';
import './App.css';
import 'milligram'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import auth from './auth'

import Home from './components/Home'
import LogIn from './components/LogIn'
import LogOut from './components/LogOut'
import SignUp from './components/SignUp'
import Books from './components/Books'

class App extends Component {

  state = {
    currentUser: auth.getCurrentUser()
  }

  setCurrentUser() {
    this.setState({
      currentUser: auth.getCurrentUser()
    })
  }

  logOut() {
    auth.clearToken()
    this.setState({currentUser: null})
  }

  render() {
    const currentUser = this.state.currentUser
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h2>The Book Club</h2>
              {currentUser
                ?
                  <span>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/books'>Books</NavLink>
                    <NavLink to='/logout'>LogOut</NavLink>
                  </span>
                :
                  <span>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/login'>LogIn</NavLink>
                    <NavLink to='/signup'>SignUp</NavLink>
                  </span>
              }
          </div>
          {currentUser
              ? <p>welcome, {currentUser.name}!</p>
              : <p>log in or sign up!</p>
          } <br />
          <Route exact path='/' component={Home} />
          <Route path='/login' render={() => (
            <LogIn onLogIn={this.setCurrentUser.bind(this)} />
          )} />
          <Route path='/logout' render={() => (
            <LogOut onLogOut={this.logOut.bind(this)} />
          )} />
          <Route path='/signup' component={SignUp} />
          <Route path='/books' component={Books} />
        </div>
      </Router>
    );
  }
}

export default App;
