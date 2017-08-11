import React from 'react'
import auth from '../auth.js'
import { Redirect } from 'react-router-dom'

class SignUp extends React.Component {

  state = {
    shouldRedirect: false
  }

  handleFormSubmit(evt) {
    evt.preventDefault()
    const formData = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    auth.signUp(formData).then(success => {
      if (success) {
        this.setState({shouldRedirect: true})
      }
      console.log(success)
    })
  }

  render() {
    return(
      this.state.shouldRedirect
      ? <Redirect to='/login' />
      : (
        <div>
          <div className='signUp'>
            <h1>Sign Up</h1>
            <form onSubmit={this.handleFormSubmit.bind(this)}>
              <div>
                <input ref='name' type='text' placeholder='Your Name' />
              </div>
              <div>
                <input ref='email' type='text' placeholder='Your Email' />
              </div>
              <div>
                <input ref='password' type='password' placeholder='Password' />
              </div>
              <div>
                <button type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )
    )
  }

}

export default SignUp
