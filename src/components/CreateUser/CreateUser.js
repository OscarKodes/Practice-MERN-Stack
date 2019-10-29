import React, {Component} from 'react';
import axios from 'axios';

class createUser extends Component {

    state = {
        username: '',
    };

    changeUsernameHandler = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);

        axios.post('http://localhost:5000/users', user)
            .then(res => console.log(res.data));

        this.setState({username: ''});

        window.location = '/exercises';
    }

    render() {
 
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label className="mr-1">Username</label>
                        <input
                            type="text"
                            value={this.state.username}
                            onChange={this.changeUsernameHandler} />
                    </div>

                    <div className="form-group">
                        <input 
                            type="submit" 
                            value="Submit User"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
        
    }

}

export default createUser;