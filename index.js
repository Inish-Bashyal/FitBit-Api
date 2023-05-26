const express = require('express')
const mongoose = require('mongoose')

const app = express()


mongoose.connect('mongodb://localhost:27017/fitbit')
    .then(() => console.log('Conneted to mongodb server'))
    .catch((err) => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello world')
})


app.listen(3001, () => {
    console.log('server is running on port 3001')
})