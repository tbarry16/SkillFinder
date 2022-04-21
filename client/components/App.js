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
            userMessage: null
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
                fetch('/login', {
                    method: 'POST',
                    
                })
            } else {
                return this.setState({
                    userMessage: 'Email and Password Required'
                })
            }

        }
    }

    render() {

        if(this.state.isLogin) {
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
                        {this.state.userMessage}
                    </div>
                </div>
            )
        }

        if(this.state.isSignup) {
            return (
                <div>
                    <p>Signup Page!</p>
                </div>
            )
        }

        if (this.state.isManager) {
            return (
                <div>
                    <ManagerPage />
                </div>
            )
        }
        if (this.state.isEmployee) {
            return (
                <div>
                    <EmployeePage />
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