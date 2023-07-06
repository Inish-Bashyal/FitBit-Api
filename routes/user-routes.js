const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const upload = require("../middlewares/upload");

const {
  getUsers,
  getUser,
  register,
  login,
  // searchByBatch,
  // searchByCourse,
  updateUser,
  deleteUser,
  uploadImage,
  getMe,
} = require("../controller/UserController");

router.post("/uploadImage", upload, uploadImage);
router.post("/register", register);
router.post("/login", login);
router.get("/getAllUsers", protect, getUsers);
// router.get("/getStudentsByBatch/:batchId", protect, searchByBatch);
// router.get("/getStudentsByCourse/:courseId", protect, searchByCourse);
router.put("/updateUser/:id", protect, updateUser);
router.delete("/deleteUser/:id", protect, deleteUser);
router.get("/getMe/:id", protect, getMe);

module.exports = router;
