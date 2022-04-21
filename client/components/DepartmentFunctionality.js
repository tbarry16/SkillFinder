import React, { Component } from 'react'



class DepartmentFunctionality extends Component {
    constructor(props) {
        super(props)
        this.state = {
            departmentsList: [],
            departmentFunctionality: null,
            userMessage: null
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        fetch('/manager/department')
          .then(response => response.json())
          .then(data => {
              this.setState({
                  departmentsList: data,
                  departmentFunctionality: null
              })
          })
    }

    // componentDidUpdate() {
    //     fetch('/manager/department')
    //       .then(response => response.json())
    //       .then(data => {
    //           this.setState({departmentsList: data})
    //       })
    // }

    handleClick(event) {

        if (event.target.id === 'reset') {
            this.setState({
                departmentFunctionality: null,
                userMessage: null
            })
            return;
        }

        if (event.target.id === "submitDeptInfo") {
            
            const deptName = document.getElementById("departmentName").value
            const description = document.getElementById("departmentDesc").value

            console.log(deptName, description)

            if (deptName !== 'Department Name' && description !== 'Description') {

                const empObj = {
                    name: deptName,
                    description: description
                }
                fetch('/manager/department', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(empObj)
                })
                .then(resp => {
                    fetch('/manager/department')
                    .then(response => response.json())
                    .then(data => {
                    this.setState({
                        departmentFunctionality: null,
                        departmentsList: data
                    })
                  })
                })
            }
            return this.setState({
                userMessage: "Department name and description are required"
            })
        }

        return this.setState({
            departmentFunctionality: event.target.id
        })

    }

    render() {

        if (this.state.departmentFunctionality === 'view') {  // view departments button clicked and render employees list
            const tableRows = []
            this.state.departmentsList.map(i => {
                tableRows.push(
                    <tr>
                        <td>{i.department_id}</td>
                        <td>{i.department_name}</td>
                        <td>{i.description}</td>
                    </tr>
                )
            })

            return (
                <div className="departmentFunctionalityContainer">
                    <h3 className="functionalityHeader">Departments List  <button id='reset' onClick={this.handleClick}>Go Back</button></h3>
                    <table className="displayTable">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
            )
        } 

        if (this.state.departmentFunctionality === 'add') {
            let userMessage;  // render adding employee form
            if (this.state.userMessage) {
                userMessage = <p>{this.state.userMessage}</p>
            }
            return (
                <div>
                    <h3>Please fill out the form below  <button id='reset' onClick={this.handleClick}>Go Back</button></h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>Department Name</th>
                                <th>Description</th>
                            </tr>
                            <tr>
                                <td><input defaultValue="Department Name" id="departmentName" type='text'></input></td>
                                <td><input defaultValue="Description" id="departmentDesc"></input></td>
                            </tr>
                        </tbody>
                    </table>
                    {userMessage}
                    <button id="submitDeptInfo" onClick={this.handleClick}>Submit</button>
                </div>
            )
        }

        return (
            <div className="departmentFunctionalityContainer">
                <h3 className="functionalityHeader">Department Functionality</h3>
                <h5 className="functionalityHeader">What would you like to do?</h5>
                <div className="employeeFuncButtons">
                    <button id="view" onClick={this.handleClick}>View Departments List</button>
                    <button id="add" onClick={this.handleClick}>Add Department</button>
                    <button id="update" onClick={this.handleClick}>Update Department</button>
                    <button id="delete" onClick={this.handleClick}>Delete Department</button>
                </div>
            </div>
        )
    }
}

export default DepartmentFunctionality