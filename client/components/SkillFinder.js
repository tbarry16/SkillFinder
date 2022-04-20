import React, { Component } from 'react';

class SkillFinder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeesWithSkill: []
        }
        this.handleClick = this.handleClick.bind(this)
    } 

    handleClick() {
        const skillText = document.getElementById('skillFinderInput').value
        document.getElementById('skillFinderInput').value = ''

        fetch(`/employee/${skillText}`)
          .then(response => response.json())
          .then(data => {
              this.setState({
                  employeesWithSkill: data
              })
          })

    }

    render() {

        const employeesWithSkill = [];

        
        this.state.employeesWithSkill.map(i => {
            employeesWithSkill.push(<li><strong>{i.first_name + ' ' + i.last_name + ': '}</strong>{i.email}</li>)
        })

        return (
            <div>
                <label><strong>Skill:</strong></label>
                <input id='skillFinderInput' type='text'></input>
                <button onClick={this.handleClick}>Submit</button>
                <div className="employeesWithSkillContainer">
                    <ul>
                        {employeesWithSkill}
                    </ul>
                </div>
            </div>
        )
    }
}


export default SkillFinder;