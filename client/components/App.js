import React, { Component } from 'react';
import EmployeePage from './EmployeePage';
import ManagerPage from './ManagerPage'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isManager: false,
            isEmployee: false,
            isLogin: false,
            isSignup: false,
            userMessage: null,
            isUser: null
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        if (event.target.id === 'login') {
            this.setState({
                isLogin: true
            })
        }
        if (event.target.id === 'signup') {
            this.setState({
                isSignup: true
            })
        }

        if (event.target.id === 'logInButton') {
            const email = document.getElementById('username').value;
            const password = document.getElementById('password').value

            if (email !== 'email' && password !== 'password') {
                console.log(email, password)
                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
                  .then(resp => resp.json())
                  .then(data => {
                      if (data.role <= 2) {
                        return this.setState({
                            isUser: data.isUser,
                            isManager: true,
                            isLogin: false
                        })
                      } else {
                        return this.setState({
                            isUser: data.isUser,
                            isEmployee: true,
                            isLogin: false
                        })
                      }
                      
                  })
            } else {
                return this.setState({
                    userMessage: 'Email and Password Required'
                })
            }

        }

        if (event.target.id === 'signUpButton') {
            const email = document.getElementById('username').value;
            const password1 = document.getElementById('password1').value;
            const password2 = document.getElementById('password2').value;

            if (password1 !== password2) {
                return this.setState({
                    userMessage: 'Passwords must match!'
                })
            }

            if (email !== 'email' && password1 !== "password") {
                fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password1
                    })
                })
                  .then(resp => resp.json())
                  .then(data => {
                      if (data <= 2) {
                          return this.setState({
                              isSignup: false,
                              isUser: true,
                              isManager: true
                          })
                      } else if (data > 2) {
                          return this.setState({
                              isSignup: false,
                              isUser: true,
                              isEmployee: true
                          })
                      }

                      return this.setState({
                          userMessage: 'This email was not found. Ask your manager to add you to the system.'
                      })
                  })
            }
        }

        if (event.target.id === 'viewSwitchEmployee') {
            return this.setState({
                isEmployee: true
            })
        }

        if (event.target.id === 'viewSwitchManager') {
            if (this.state.isManager) {
                return this.setState({
                    isEmployee: false
                })
            } else {
                return this.setState({
                    userMessage: 'You are not a manager!'
                })
            }
        }
    }

    render() {

        if(this.state.isLogin) { //if login button clicked, render login page
            return (
                <div className='loginContainer'>
                    <div>
                        <h3>Fill out the form below to log in!</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label><strong>Username:</strong></label></td>
                                    <td><input id='username' defaultValue='email' type="text"></input></td>
                                </tr>
                                <tr>
                                    <td><label><strong>Password:</strong></label></td>
                                    <td><input id='password' defaultValue='password' type="password"></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <button id='logInButton' onClick={this.handleClick}>Submit</button>
                        {this.state.userMessage}
                    </div>
                </div>
            )
        }

        if(this.state.isSignup) {
            return (
                <div className='loginContainer'>
                    <div>
                        <h3>Fill out the form below to sign up!</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label><strong>Username:</strong></label></td>
                                    <td><input id='username' defaultValue='email' type="text"></input></td>
                                </tr>
                                <tr>
                                    <td><label><strong>Password:</strong></label></td>
                                    <td><input id='password1' defaultValue='password' type="password"></input></td>
                                </tr>
                                <tr>
                                    <td><label><strong>Confirm Password:</strong></label></td>
                                    <td><input id='password2' defaultValue='password' type="password"></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <button id='signUpButton' onClick={this.handleClick}>Submit</button>
                        {this.state.userMessage}
                    </div>
                </div>
            )
        }

        if (this.state.isUser === true) {  //if after login a user with email and password is found
            if (this.state.isManager === true && this.state.isEmployee === false) { // check their role and render manager or employee page as appropriate
                return (
                    <div>
                        <button id="viewSwitchEmployee" onClick={this.handleClick}>View Employee Page</button>
                        <ManagerPage />
                    </div>
                )
            }
            if (this.state.isEmployee) {
                return (
                    <div>
                        <button id="viewSwitchManager" onClick={this.handleClick}>View Manager Page</button>
                        {this.state.userMessage}
                        <EmployeePage />
                    </div>
                )
            }
        } else if (this.state.isUser === false) { //if failed login attempt render error message
            return (
                <div className='loginContainer'>
                    <div>
                        <h3>Fill out the form below to log in!</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label><strong>Username:</strong></label></td>
                                    <td><input id='username' defaultValue='email' type="text"></input></td>
                                </tr>
                                <tr>
                                    <td><label><strong>Password:</strong></label></td>
                                    <td><input id='password' defaultValue='password' type="text"></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <button id='logInButton' onClick={this.handleClick}>Submit</button>
                        <p>Invalid username and/or password!</p>
                    </div>
                </div>
            )
        }

        return (
        <div className='main-container'>
            <p>Welcome to Skill Finder where we aim to streamline answering questions you may have as an employee!</p>
            <p>Our app allows you to skip the middleperson, and go directly to the source to get your questions answered!</p>
            <p>First things first, would you like to login or sign-up? Please click the appropriate button below!</p>

            <div className='buttonContainer'>
                <button id='login' onClick={this.handleClick}>Log In</button>
                <button id='signup' onClick={this.handleClick}>Sign Up</button>
            </div>
        </div>
        )
    }
}

export default App;