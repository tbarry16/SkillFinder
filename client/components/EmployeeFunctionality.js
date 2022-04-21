/* eslint-disable no-unused-vars */
import React, { Component } from 'react';



class EmployeeFunctionality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeesList: [],
            employeeFunctionality: null,
            departmentsList: {},
            rolesList: {},
            // newEmployee: {},
            skillsNeeded: null
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch('/manager/employee')
          .then(response => response.json())
          .then(data => {
              this.setState({employeesList: data})
          })
        
        fetch('/manager/department')
          .then(response => response.json())
          .then(data => {
              let newObj = {}
              data.forEach(obj => {newObj[obj.department_name] = obj.department_id})
              this.setState({departmentsList: newObj})
          })

        fetch('/manager/role')
        .then(response => response.json())
        .then(data => {
            let newObj = {}
            data.forEach(obj => {newObj[obj.role_name] = obj.role_id})
            this.setState({rolesList: newObj})
        })

    }

    handleClick(event) {

        if (event.target.id === 'reset') {
            this.setState({
                employeeFunctionality: null
            })
            return;
        }

        if (event.target.id === "submitEmplInfo") {
            const firstName = document.getElementById("firstNameText").value
            const lastName = document.getElementById("lastNameText").value
            const email = document.getElementById('emailText').value
            let department = document.getElementById("departmentText").value
            department = this.state.departmentsList[department]
            let role = document.getElementById("roleText").value
            role = this.state.rolesList[role]

            let skillArray = [
                document.getElementById('firstSkill').value,
                document.getElementById('secondSkill').value,
                document.getElementById('thirdSkill').value
            ]

            let skillDescriptionsArray = [
                document.getElementById('firstSkillDesc').value,
                document.getElementById('secondSkillDesc').value,
                document.getElementById('thirdSkillDesc').value
            ]


            for (let i = 0; i < skillArray.length; i++) {
                if (skillArray[i] === 'Skill Name') {
                    skillArray = skillArray.slice(0, i)
                    skillDescriptionsArray = skillDescriptionsArray.slice(0, i)
                }
            }

            const empObj = {
                first_name: firstName,
                lastName: lastName,
                department: department,
                role: role,
                email: email,
                skills: skillArray,
                skill_descriptions: skillDescriptionsArray
            }

            fetch('/manager/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(empObj)
            })
            .then(resp => {
                fetch('/manager/employee')
                .then(response => response.json())
                .then(data => {
                this.setState({
                    employeeFunctionality: null,
                    employeesList: data
                })
              })
            })
            return;
        }

        return this.setState({
            employeeFunctionality: event.target.id
        })
        
    }

    render() {

        if (this.state.employeeFunctionality === 'view') {  // view employees button clicked and render employees list
            const tableRows = []
            this.state.employeesList.map(i => {
                tableRows.push(
                    <tr>
                        <td>{i.employee_id}</td>
                        <td>{i.first_name + " " + i.last_name}</td>
                        <td>{i.department_name}</td>
                        <td>{i.role_name}</td>
                        <td>{i.email}</td>
                    </tr>
                )
            })

            return (
                <div className="employeeFunctionalityContainer">
                    <h3 className="functionalityHeader">Employees List  <button id='reset' onClick={this.handleClick}>Go Back</button></h3>
                    
                    <table className="displayTable">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Role</th>
                                <th>Email</th>
                            </tr>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
                    )
        }

        if (this.state.employeeFunctionality === 'add') {  // render adding employee form
            return (
                <div>
                    <h3>Please fill out the form below  <button id='reset' onClick={this.handleClick}>Go Back</button></h3>
                    <table>
                        <tbody>
                            <tr>
                                <td><label><strong>First Name: </strong></label></td>
                                <td><input id='firstNameText' type='text'></input></td>
                                <td>*Required</td>
                            </tr>
                            <tr>
                                <td><label><strong>Last Name: </strong></label></td>
                                <td><input id='lastNameText' type='text'></input></td>
                                <td>*Required</td>
                            </tr>
                            <tr>
                                <td><label><strong>Department: </strong></label></td>
                                <td><input id='departmentText' type='text'></input></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><label><strong>Role: </strong></label></td>
                                <td><input id='roleText' type='text'></input></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><label><strong>Email: </strong></label></td>
                                <td><input id='emailText' type='text'></input></td>
                                <td>*Required</td>
                            </tr>
                            <tr>
                                <td><label><strong>Skill 1: </strong></label></td>
                                <td><input defaultValue="Skill Name" id="firstSkill" type='text'></input></td>
                                <td><input defaultValue="Description" id="firstSkillDesc"></input></td>
                            </tr>
                            <tr>
                                <td><label><strong>Skill 2: </strong></label></td>
                                <td><input defaultValue="Skill Name" id="secondSkill" type='text'></input></td>
                                <td><input defaultValue="Description" id="secondSkillDesc"></input></td>
                            </tr>
                            <tr>
                                <td><label><strong>Skill 3: </strong></label></td>
                                <td><input defaultValue="Skill Name" id="thirdSkill" type='text'></input></td>
                                <td><input defaultValue="Description" id="thirdSkillDesc"></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <button id="submitEmplInfo" onClick={this.handleClick}>Submit</button>
                </div>
            )
        }

        return ( // initial render before any buttons clicked
            <div className="employeeFunctionalityContainer">
                <h3 className="functionalityHeader">Employee Functionality</h3>
                <h5 className="functionalityHeader">What would you like to do?</h5>
                <div className="employeeFuncButtons">
                    <button id="view" onClick={this.handleClick}>View Employees List</button>
                    <button id="add" onClick={this.handleClick}>Add Employee</button>
                    <button id="update" onClick={this.handleClick}>Update Employee</button>
                    <button id="delete" onClick={this.handleClick}>Delete Employee</button>
                </div>
            </div>
        )
    }
}

export default EmployeeFunctionality;