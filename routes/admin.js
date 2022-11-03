const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");

// @GET Route
// @DESC Get logged in Admin Details
router.get("/me", auth, adminController.getLoggedInAdmin);

// @POST Route
// @DESC Admin Signup
router.post("/register", adminController.signup);

// @POST Route
// @DESC Admin Login
router.post("/login", adminController.login);

// @GET Route
// @DESC Get all Parkings
router.get("/all-parkings", auth, adminController.getAllParkings);

// @DELETE Route
// @DESC Manage Parking
router.delete("/delete-parking/:id", auth, adminController.manageParking);

// @GET Route
// @DESC Get ALL Categories
router.get("/categories/all", auth, adminController.getAllCategories);

// @POST Route
// @DESC Create Category
router.post("/create-category", auth, adminController.createCategory);

// @PUT Route
// @DESC Update Category
router.put("/update-category/:id", auth, adminController.editCategory);

// @DELETE Route
// @DESC Delete Category
router.delete("/delete-category/:id", auth, adminController.deleteCategory);

// @GET Route
// @DESC Get ALL users
router.get("/all-users", auth, adminController.getAllUsers);

// @DELETE Route
// @DESC User remove
router.delete("/remove-user/:id", auth, adminController.removeUser);

module.exports = router;
