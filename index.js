const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv').config();



// connect to DB
mongoose.connect('mongodb+srv://miles-parnell:password@auth-api-test-ojgbz.mongodb.net/test?retryWrites=true&w=majority',
    // mongo needs this to read the url ^
    { useNewUrlParser: true },
    () => console.log('connected to DB')
);

// import routes
//########################################################################################
const authRoute = require('./routes/auth');
const profile = require('./routes/profile');

// middleware
app.use(express.json());

// route middleware
//########################################################################################
app.use('/api/user', authRoute);
app.use('/api/profile');


//server listen
app.listen('3000', () => console.log('server running on port 3000.'));

// const girl = (nut) => {
//     let baby = pipe(nut);
//     return baby;
// };