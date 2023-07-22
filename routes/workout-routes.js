const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const upload = require("../middlewares/upload");

const {
  getWorkouts,
  getWorkout,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  uploadImage,
  getMe,
  createProductReview,
  getWorkoutReviews,
  deleteWorkoutReview,
} = require("../controller/WorkourtController");


router.post("/uploadImage", upload, uploadImage);
router.post("/addWorkout", protect,addWorkout);
router.get("/getAllWorkouts",protect, getWorkouts);
router.get("/getWorkout/:id", protect, getWorkout);
router.put("/updateWorkout/:id", protect, updateWorkout);
router.delete("/deleteWorkout/:id", protect, deleteWorkout);
router.get("/getMe/:id", protect, getMe);
router.route('/review').put(protect,createProductReview)
router.route('/give/review').put(protect,createProductReview)
router.route('/reviews').get(getWorkoutReviews)
router.route('/reviews/delete/:id').delete(protect, deleteWorkoutReview)

module.exports = router;
