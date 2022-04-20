import React, { Component } from 'react';
import SkillList from './SkillList'

class EmployeePage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    } 

    componentDidMount() {
        
    }

    render() {
        return (
            <div className='employeePageContainer'>
                <p>Welcome to the employee page!</p>
                <p>This page allows you to look up employees based on the skills they have. Your manager has designated each employees skills. Go ahead and take a look at the list of skills available to look up!</p>
                {/* <SkillList /> */}
            </div>
        )
    }
}


export default EmployeePage;