const Routine = require("../models/Routines")
const Workout = require("../models/Workout")
const ErrorHandler = require("../utils/error_handler")
const catchAsyncError = require("../middlewares/catchAsyncErrors")
const mongoose = require("mongoose")


exports.createRoutine = catchAsyncError(async(req,res,next)=>{
    const {
      workout,
      routineStatus,
      completedAt,
    }=req.body

    const routine = await Routine.create({
      workout,
      routineStatus,
      completedAt,
        enrolledAt: Date.now(),
        user: req.user._id
    });
    res.status(201).json({
        success: true,
        routine
    })
})

exports.getSingleRoutine = catchAsyncError(async (req, res, next) => {
  const routine = await Routine.findById(req.params.id).populate(
    "username",
    "email"
  );

  if (!routine) {
    return next(new ErrorHandler("Routine not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    routine,
  });
});

// check your own orders
exports.myRoutines = catchAsyncError(async (req, res, next) => {
    const routines = await Routine.find({ user: req.user._id }).populate('workout');
    console.log(routines)
  
    res.status(200).json({
      success: true,
      routines,
    });
  });

  //get all orders

  exports.getAllRoutines = catchAsyncError(async (req, res, next) => {
    const routines = await Routine.find();
  
  
    res.status(200).json({
      success: true,
      routines,
    });
  });


//update order 
exports.updateRoutine = catchAsyncError(async (req, res, next) => {
  const routine = await Routine.findById(req.params.id);

  if (!routine) {
    return next(new ErrorHandler("Routine not found with this Id", 404));
  }

  if (routine.routineStatus === "Completed") {
    return next(new ErrorHandler("You have already completed this routine", 400));
  }

  if (req.body.routineStatus === "Completed") {
    routine.completedAt = Date.now();
  }

  await routine.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//delete the routine
  exports.deleteRoutine = catchAsyncError(async (req, res, next) => {
    console.log(req.params.id);
  await Routine.findByIdAndDelete(req.params.id).then((routine) => {
    if (!routine) {
      return res
        .status(404)
        .json({ message: "Routine not found with id of ${req.params.id}" });
    }
    res.status(200).json({ success: true, data: routine });
  });
});