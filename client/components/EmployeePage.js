import React, { Component } from 'react';
import SkillFinder from './SkillFinder'

class EmployeePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            skillsArray: [],
            descriptionsArray: []
        }
    } 

    componentDidMount() {

        fetch('/skill')
          .then(response => response.json())
          .then(data => {
              this.setState({
                  skillsArray: data.skills,
                  descriptionsArray: data.description
              })
          })
    }

    render() {

        const skillListItems = [];

        if (this.state.skillsArray.length) {
            for (let i = 0; i < this.state.skillsArray.length; i++) {
                skillListItems.push(<li className='skillListItem'><strong>{this.state.skillsArray[i]}: </strong>{this.state.descriptionsArray[i]}</li>)
            }
        }

        return (
            <div className='employeePageContainer'>
                <h3>Welcome to the employee page!</h3>
                <p>This page allows you to look up employees based on the skills they have. Your manager has designated each employees skills. Go ahead and take a look at the list of skills available to look up!</p>
                <h2>List of Stored Skills:</h2>
                <ul id="skillList">
                    {skillListItems}
                </ul>
                <SkillFinder />
            </div>
        )
    }
}


export default EmployeePage;