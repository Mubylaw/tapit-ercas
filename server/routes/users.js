const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  sendInvite,
  acceptInvite,
  getUserStats,
  getAllStats,
  viewInvite,
} = require("../controllers/users");

const User = require("../models/User");

const router = express.Router({ mergeParams: true });

// Protect middleware
const { protect, authorize, lastActive } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

router.use(protect, lastActive);

router.post("/", authorize("admin"), createUser);
router.get("/", authorize("admin"), advancedResults(User), getUsers);

router.post("/invite", sendInvite);
router.post("/invite/:resettoken", acceptInvite);
router.get("/invite/:resettoken", viewInvite);
router.get("/:id/stats", getUserStats);
router.get("/stats", getAllStats);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(authorize("admin"), deleteUser);

module.exports = router;
