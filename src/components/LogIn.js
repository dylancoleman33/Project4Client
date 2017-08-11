import React from 'react'
import auth from '../auth.js'
import { Redirect } from 'react-router-dom'

class LogIn extends React.Component {

  state = {
    shouldRedirect: false
  }

  handleFormSubmit(evt) {
    evt.preventDefault()
    const formData = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    console.log(formData)
    auth.logIn(formData).then(user => {
      if (user) {
        this.props.onLogIn()
        this.setState({shouldRedirect: true})
      }
      console.log(user)
    })
  }

  render() {
    return (
      this.state.shouldRedirect
      ? <Redirect to='/' />
      : (
        <div>
          <div className="logIn">
            <h1>Log In</h1>
            <form onSubmit={this.handleFormSubmit.bind(this)}>
              <div>
                <input ref='email' type='text' placeholder='email' />
              </div>
              <div>
                <input ref='password' type='password' placeholder='password' />
              </div>
              <div>
                <button type='submit'>login</button>
              </div>
            </form>
          </div>
        </div>
      )
    )
  }
}

export default LogIn
