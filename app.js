const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routes
const authRoutes = require('./routes/auth');
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => { console.log('DB connected') });


//Route Middlewares
app.use(express.json());
app.use('/api/user', authRoutes);
//start listening the server
app.listen(3104, () => console.log('Server is Up and running'));