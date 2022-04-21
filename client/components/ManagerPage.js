import React, { Component } from 'react';
import EmployeeFunctionality from './EmployeeFunctionality';
import DepartmentFunctionality from './DepartmentFunctionality'


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
                    <ul className='functionalityList'><h4>Employee Data:</h4>
                        <li className='funcListItem'>Retrieve employee list</li>
                        <li className='funcListItem'>Add a new employee</li>
                        <li className='funcListItem'>Update employee information</li>
                        <li className='funcListItem'>Remove employee from database</li>
                    </ul>
                    {/* <ul className='functionalityList'><h4>Skill Data:</h4>
                        <li className='funcListItem'>Add new skills to database</li>
                        <li className='funcListItem'>Delete skills no longer pertinent</li>
                    </ul> */}
                    <ul className='functionalityList'><h4>Department Data:</h4>
                        <li className='funcListItem'>Retrieve departments list</li>
                        <li className='funcListItem'>Add a new department</li>
                        <li className='funcListItem'>Update an existing department</li>
                        <li className='funcListItem'>Delete a department</li>
                    </ul>
                    <ul className='functionalityList'><h4>Role Data:</h4>
                        <li className='funcListItem'>Retrieve roles list</li>
                        <li className='funcListItem'>Add a new role</li>
                        <li className='funcListItem'>Update an existing role</li>
                        <li className='funcListItem'>Delete a role</li>
                    </ul>
                </div>
                <EmployeeFunctionality />
                {/* <SkillFunctionality /> */}
                <DepartmentFunctionality />
                {/* <RoleFunctionality /> */}

                
            </div>
        )
    }
}


export default ManagerPage;