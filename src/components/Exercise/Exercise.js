import React from 'react';
import {Link} from 'react-router-dom';


const exercise = (props) => (

    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.slice(0, 10)}</td>
        <td>
            <Link 
                className="btn btn-small btn-outline-primary py-0 mr-1"
                to={"/edit/" + props.exercise._id}>
                Edit
            </Link>
            <button
                className="btn btn-small btn-outline-danger py-0"
                onClick={() => {props.deleteExercise(props.exercise._id)}}>
                Delete
            </button>
        </td>
    </tr>
)

export default exercise;