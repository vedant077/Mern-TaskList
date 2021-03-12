import React, {Component} from 'react';
import "../index.css";
import axios from 'axios';

const Task = props => (
    <tr>
        <td>{props.task.task_description}</td>
        <td>{props.task.task_date}</td>
        <td>{props.task.task_starred}</td>
    </tr>
)


export default class TaskList extends Component{
    
    constructor(props) {
        super(props);
        this.state = {tasks: []};
    }

    componentDidMount() {
        axios.get('http://localhost:8000/tasks/')
            .then(response => {
                this.setState({tasks: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    taskList() {
        return this.state.tasks.map(function(currentTask, i) {
            return <Task task={currentTask} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h2>Tasks List</h2>
                <table className="menu navigation-menu" style={{ marginTop: 30 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Starred</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.taskList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
