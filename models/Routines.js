const mongoose = require('mongoose')

const remarkSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLength: [100, 'review should be longer than 100 characters']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    completed:{
        type: Boolean,

    }
})

const routineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    nameOfWorkout: {
        type: String,
        required: true
    },
    numberOfReps: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    remarks: [remarkSchema]
})

module.exports = mongoose.model('Routine', routineSchema)