import React, {Component} from 'react';
import axios from 'axios';
import Exercise from '../Exercise/Exercise';

class ExercisesList extends Component {

    state = {
        exercises: []
    }

    componentDidMount() {
        axios.get("http://localhost:5000/exercises")
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({exercises: res.data});
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    deleteExerciseHandler = (id) => {
        axios.delete("http://localhost:5000/exercises/" + id)
            .then(res => console.log(res.data));
        this.setState({
            exercises: this.state.exercises.filter(exercise => exercise._id !== id)
        })
    }

    exerciseList = () => {
        return this.state.exercises.map(currExercise => {
            return (
                <Exercise
                    exercise={currExercise}
                    deleteExercise={this.deleteExerciseHandler}
                    key={currExercise._id}
                     />
            )
        })
    }

    render() {

        return (
            <div>
                <h1>Logged Exercises</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr className="">
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}


export default ExercisesList;