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
} = require("../controller/WorkourtController");


router.post("/uploadImage", upload, uploadImage);
router.post("/addWorkout", protect,addWorkout);
router.get("/getAllWorkouts",protect, getWorkouts);
router.get("/getWorkout/:id", protect, getWorkout);
router.put("/updateWorkout/:id", protect, updateWorkout);
router.delete("/deleteWorkout/:id", protect, deleteWorkout);
router.get("/getMe/:id", protect, getMe);

module.exports = router;
