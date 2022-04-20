import React, { Component } from 'react';
import EmployeePage from './EmployeePage';
import ManagerPage from './ManagerPage'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isManager: false,
            isEmployee: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        if (event.target.id === 'managerButton') {
            this.setState({
                isManager: true
            })
        }
        if (event.target.id === 'employeeButton') {
            this.setState({
                isEmployee: true
            })
        }
    }

    render() {

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
            <p>Skip the middleperson, and go directly to the source to get your questions answered!</p>
            <p>First things first, are you a Manager or an Employee? Please click the appropriate button below!</p>

            <div className='buttonContainer'>
                <button id='managerButton' onClick={this.handleClick}>Manager</button>
                <button id='employeeButton' onClick={this.handleClick}>Employee</button>
            </div>
        </div>
        )
    }
}

export default App;