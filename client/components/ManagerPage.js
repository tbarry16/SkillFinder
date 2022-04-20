import React, { Component } from 'react';


class ManagerPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            skillsArray: [],
        }
    } 

    componentDidMount() {

        fetch('/skill')
          .then(response => response.json())
          .then(data => {
              this.setState({
                  skillsArray: data
              })
          })
    } 


    render() {
        return (
            <div className='managerPageContainer'>
                <h3>Welcome to the Manager Page</h3>
                <p>This page is designed to allow managers to interract directly with the database.</p>
                <p>Some current functionality includes:</p>
                <div className='managerFunctionalityLists'>
                    <ul><h4>Employee Functionality:</h4>
                        <li>Retrieve employee list</li>
                        <li>Add a new employee</li>
                        <li>Update employee information</li>
                        <li>Remove employee from database</li>
                    </ul>
                    <ul><h4>Skill Functionality:</h4>
                        <li>Add new skills to database</li>
                        <li>Delete skills no longer pertinent</li>
                    </ul>
                    <ul><h4>Department Functionality:</h4>
                        <li>Add a new department</li>
                        <li>Update an existing department</li>
                        <li>Delete a department</li>
                    </ul>
                    <ul><h4>Employee Role Functionality:</h4>
                        <li>Add a new role</li>
                        <li>Update an existing role</li>
                        <li>Delete a role</li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default ManagerPage;