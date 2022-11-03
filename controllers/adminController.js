const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Parking = require("../models/Parking");
const Category = require("../models/Category");
const User = require("../models/User");
require("dotenv").config();

exports.getLoggedInAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);

    var parking = await Parking.find({ organisationID: admin.id });
    return res.json({
      statusCode: 200,
      admin: admin,
      totalBooking: admin.parkingSlots,
      booked: parking.length,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, organisation, parkingSlots } = req.body;

    var admin = await Admin.findOne({
      email: email,
      organisation: organisation,
    });

    if (admin) {
      return res.json({ statusCode: 400, message: "Admin Already Exists!" });
    }

    admin = new Admin({
      name,
      email,
      password,
      organisation,
      parkingSlots,
    });

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    await admin.save();

    // Token Generation
    const payload = {
      user: {
        id: admin.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 360000000 },
      (err, token) => {
        if (err) throw err;
        return res.json({
          statusCode: 200,
          message: "Admin Registered!",
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    var admin = await Admin.findOne({
      email: email,
    });

    if (!admin) {
      return res.json({ statusCode: 400, message: "Admin Doesnt Exists!" });
    }
    // Compare Password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.json({ statusCode: 400, message: "Invalid Credentials" });
    }

    // Token Generation
    const payload = {
      user: {
        id: admin.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 360000000 },
      (err, token) => {
        if (err) throw err;
        return res.json({
          statusCode: 200,
          message: "Admin Logged-In!",
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAllParkings = async (req, res) => {
  try {
    const parkings = await Parking.find({ organisationID: req.user.id });
    return res.json(parkings);
  } catch (error) {
    console.log(error.message);
  }
};

exports.manageParking = async (req, res) => {
  try {
    await Parking.findByIdAndDelete(req.params.id);
    return res.json({ statusCode: 200, message: "Parking removed!" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    var categories = await Category.find({ organisationID: req.user.id });
    return res.json(categories);
  } catch (error) {
    console.log(error.message);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, fees } = req.body;
    var category = await Category.findOne({
      name,
      organisationID: req.user.id,
    });
    if (category) {
      return res.json({ statusCode: 400, message: "Category Already Exists!" });
    }

    category = new Category({ name, fees, organisationID: req.user.id });
    await category.save();
    return res.json({ statusCode: 200, message: "Category Saved!" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.editCategory = async (req, res) => {
  try {
    const { name, fees } = req.body;
    await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name, fees } },
      { new: true }
    );
    return res.json({ statusCode: 200, message: "Category Updated!" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    return res.json({ statusCode: 200, message: "Category removed!" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);

    const users = await User.find({ organisation: admin.organisation });

    return res.json(users);
  } catch (error) {
    console.log(error.message);
  }
};

exports.removeUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ statusCode: 200, message: "User removed!" });
  } catch (error) {
    console.log(error.message);
  }
};
