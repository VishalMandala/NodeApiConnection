const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//const mongoString = process.env.DATABASE_URL;
//const mongoString = "mongodb+srv://database_user:MH70DxCgX1h8KXmM@cluster0.wxwo1vp.mongodb.net/testDatabase";
const app = express();

app.use(express.json());


mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const routes = require('./routers/routers');

app.use('/api', routes) 


app.listen(4000, () => {
    console.log(`Server Started at ${4000}`)
})
