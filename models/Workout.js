const mongoose = require('mongoose')


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
    reviews:[
        {
            user: {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Customer",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
});


module.exports = mongoose.model('Workout', workoutSchema)