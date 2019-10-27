// SET UP REQUIREMENTS==============================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// REQUIRE ROUTE FILES ==============================
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// APP USE ==========================================
app.use(cors());
app.use(express.json()); // bodyParser is included in express, no need to use bodyParser

// MONGO ATLAS CONNECTION STRING & .env file=========
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established!");
});

// ROUTERS ========================================
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// LISTENER ========================================
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 
