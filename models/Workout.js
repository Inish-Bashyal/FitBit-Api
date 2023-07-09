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

const workoutSchema = new mongoose.Schema({
    image: {
        type: String,
        default: null,
      },
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    remarks: [remarkSchema]
});


module.exports = mongoose.model('Workout', workoutSchema)