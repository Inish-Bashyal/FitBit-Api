const Workout = require("../models/Workout");
const asyncHandler = require("../middlewares/catchAsyncErrors");


exports.getWorkouts = asyncHandler(async (req, res, next) => {
    const user = await Workout.find({});
    res.status(200).json({
      success: true,
      count: user.length,
      data: user,
    });
  });

  exports.getWorkout = asyncHandler(async (req, res, next) => {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res
        .status(404)
        .json({ message: "Workout not found with id of ${req.params.id}" });
    } else {
      res.status(200).json({
        success: true,
        data: workout,
      });
    }
  });

  exports.addWorkout = asyncHandler(async (req, res, next) => {
    const workout = await Workout.findOne({ title: req.body.title });
    console.log(req.body);
    if (workout) {
      return res.status(400).send({ message: "Workout already exists" });
    }
    await Workout.create(req.body);
  
    res.status(200).json({
      success: true,
      message: "Workout added successfully",
    });
  });

  exports.updateWorkout = asyncHandler(async (req, res, next) => {
    const current_workout = req.body;
    const workout = await Workout.findByIdAndUpdate(req.params.id, current_workout, {
      new: true,
      runValidators: true,
    });
  
    if (!workout) {
      return res.status(404).send({ message: "Workout not found" });
    }
  
    res.status(200).json({
      success: true,
      message: "Workout updated successfully",
      data: workout,
    });
  });
  

  exports.getMe = asyncHandler(async (req, res, next) => {
    // Show current workout
    const workout = await Workout.findById(req.params.id);
  
    res.status(200).json({
        workout
    });
  });


  exports.deleteWorkout = asyncHandler(async (req, res, next) => {
    console.log(req.params.id);
    Workout.findByIdAndDelete(req.params.id)
      .then((workout) => {
        if (user != null) {
          var imagePath = path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            workout.image
          );
  
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.log(err);
            }
            res.status(200).json({
              success: true,
              message: "Workout deleted successfully",
            });
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Workout not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  });


exports.uploadImage = asyncHandler(async (req, res, next) => {
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file" });
    }
    res.status(200).json({
      success: true,
      data: req.file.filename,
    });
  });
  

  
  