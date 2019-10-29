import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

class editExercise extends Component {

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

        axios.get("http://localhost:5000/exercises/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            })
            .catch(function(error) {
                console.log(error)
            })

        axios.get("http://localhost:5000/users")
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        // this will set up the select dropdown menu
                        users: res.data.map(user => user.username)
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

        axios.put('http://localhost:5000/exercises/' + this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';
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
                <h3>Edit Exercise Log</h3>
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
                            value="Edit Exercise Log"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
        
    }

}

export default editExercise;