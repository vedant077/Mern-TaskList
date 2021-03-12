import React, {Component} from 'react';
import axios from 'axios';
import { DateInput } from '@progress/kendo-react-dateinputs';

export default class CreateTask extends Component {

    constructor(props){
        super(props);
    
        this.onChangeTaskDescription = this.onChangeTaskDescription.bind(this);
        this.onChangeTaskStarred = this.onChangeTaskStarred.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            task_description: '',
            task_date: new Date(),
            task_starred: '',
            task_completed: false
        }
    }
    

    onChangeTaskDescription(e) {
        this.setState({
            task_description: e.target.value
        });
    }

    onChangeTaskStarred(e) {
        this.setState({
            task_starred: e.target.value
        });
    }
    onChangeDate = (event) => {
        this.setState({ value: event.value });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Task Description: ${this.state.task_description}`);
        console.log(`Task created on: ${this.state.task_date}`);
        console.log(`Task Starred: ${this.state.task_starred}`);
        console.log(`Task Completed: ${this.state.task_completed}`);

        const newTask = {
            task_description: this.state.task_description,
                task_date: this.state.task_date,
                task_starred: this.state.task_starred,
                task_completed: this.state.task_completed
        }

        axios.post('http://localhost:8000/tasks/add-task', newTask)
            .then(res => console.log(res.data));

        this.setState({
            task_description: '',
            task_date: new Date(),
            task_starred: '',
            task_completed: false
        })
    }


    render() {
        return(
            <div>
                <h2>
                    Create New Task
                </h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.task_description}
                               onChange={this.onChangeTaskDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Starred: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.task_starred}
                                onChange={this.onChangeTaskStarred}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="starredOptions"
                                    id="starredFalse"
                                    value="false"
                                    checked={this.state.task_starred==='False'}
                                    onChange={this.onChangeTaskStarred}
                                    />
                            <label className="form-check-label">False</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="starredOptions"
                                    id="starredTrue"
                                    value="true"
                                    checked={this.state.task_starred==='True'}
                                    onChange={this.onChangeTaskStarred}
                                    />
                            <label className="form-check-label">True</label>
                        </div>
                    </div>
                    <div>
                        <label>Date: </label>
                        <DateInput
                            value={this.state.task_date}
                            onChange={this.onChangeDate}
                        />
                   </div>
                        <div className="form-group">
                            <input type="submit" value="Create Task" className="btn btn-primary" />
                        </div>
                </form>
            </div>
        )
    }

}

