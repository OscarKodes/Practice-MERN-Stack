const router = require('express').Router();
const User = require('../models/user.model');

// INDEX ROUTE
router.get('/', (req, res) => {
    
    User.find() // find() gets all the users
        .then(users => res.json(users)) // return the users in json format
        .catch(err => res.status(400).json('Error: ' + err)); // if there's an error it'll return an error message
});

// CREATE ROUTE
router.post('/', (req, res) => {
    const username = req.body.username

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!')) // returns the new user in json
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;