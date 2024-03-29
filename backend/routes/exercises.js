const router = require('express').Router();
const Exercise = require('../models/exercise.model');

// INDEX ROUTE
router.get('/', (req, res) => {
    
    Exercise.find() // find() gets all the exercises
        .then(exercises => res.json(exercises)) // return the exercises in json format
        .catch(err => res.status(400).json('Error: ' + err)); // if there's an error it'll return an error message
});

// CREATE ROUTE
router.post('/', (req, res) => {

    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json('Exercise added!')) // returns the new exercise in json
        .catch(err => res.status(400).json('Error: ' + err));
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE ROUTE
router.put('/:id', (req, res) => {

    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        }) // returns the new exercise in json
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE ROUTE
router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;