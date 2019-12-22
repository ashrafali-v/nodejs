const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

//Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () =>
    console.log('DB connected') 
);


//Route Middlewares
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


//start listening the server
app.listen(3025, () => console.log('Server is Up and running'));