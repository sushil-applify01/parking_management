const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const router = express.Router();

// @GET Route
// @DESC Get Logged in User Details
router.get("/me", auth, userController.getLoggedInUserInfo);

// @POST Route
// @DESC User Register
router.post("/register", userController.signup);

// @POST Route
// @DESC User login
router.post("/login", userController.login);

// @POST Route
// @DESC Book Parking
router.post("/create-booking", auth, userController.bookParking);

// @GET Route
// @DESC Get All Parkings
router.get("/all-parkings", auth, userController.getPrevParkings);

// @DELETE Route
// @DESC Delete Booking
router.delete("/delete-booking/:id", auth, userController.deleteBooking);

// @GET Route
// @DESC Get All Categories
router.get("/all-categories", auth, userController.getAllCategories);

// @GET Route
// @DESC Get All Organisations
router.get("/all-organisations", userController.getAllOrganisations);

module.exports = router;
