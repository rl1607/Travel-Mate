const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  createTrip,
  getTrips,
  getTripById,
  addItinerary,
  addExpense,
  addMedia,
  addMapPoint,
  deleteMapPoint,
  getAnalytics
} = require("../controllers/tripController");

// ANALYTICS ROUTE
router.get("/analytics/summary", auth, getAnalytics);

// TRIPS LIST
router.get("/", auth, getTrips);

// GET TRIP BY ID
router.get("/:id", auth, getTripById);

// CREATE TRIP
router.post("/", auth, upload.single("cover"), createTrip);

// ITINERARY
router.post("/:id/itinerary", auth, addItinerary);

// EXPENSE
router.post("/:id/expenses", auth, addExpense);

// MEDIA
router.post("/:id/media", auth, upload.single("file"), addMedia);

// MAP point
router.post("/:id/map", auth, addMapPoint);
router.delete("/:id/map/:pointIndex", auth, deleteMapPoint);


module.exports = router;
