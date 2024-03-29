import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

class createExercise extends Component {

    state = {
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    };

    componentDidMount() { 
        // This will only run once at the beginning
        // will run before component loads
        axios.get("http://localhost:5000/users")
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        // this will set up the select dropdown menu
                        users: res.data.map(user => user.username),
                        // this just sets up where the default username 
                        // is set at for the select menu
                        // === The below code is actually unecessary...
                        username: res.data[0].username
                    });
                }
            })
    }

    changeUsernameHandler = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    changeDescriptionHandler = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    changeDurationHandler = (event) => {
        this.setState({
            duration: event.target.value
        });
    }

    changeDateHandler = (date) => {
        this.setState({
            date: date
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises', exercise)
            .then(res => console.log(res.data));

        window.location = '/exercises';
    }

    render() {

        let userList = this.state.users
                        .map(function(user) {
                            return (
                                <option
                                    key={user}
                                    value={user}>
                                    {user}
                                </option>
                            )
                        })
 
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.changeUsernameHandler}>
                            {userList}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.changeDescriptionHandler} />
                    </div>
                    <div className="form-group">
                        <label>Duration: (in minutes) </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.changeDurationHandler} />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.changeDateHandler} />
                        </div>
                    </div>

                    <div className="form-group">
                        <input 
                            type="submit" 
                            value="Create Exercise Log"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
        
    }

}

export default createExercise;