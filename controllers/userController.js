const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Parking = require("../models/Parking");
const Category = require("../models/Category");
const User = require("../models/User");
require("dotenv").config();
const Admin = require("../models/Admin");
const pdfTemplate = require("../config/template");
const Vehicle = require("../models/Vehicle");
const pdf = require("html-pdf");
const otpGenerator = require("otp-generator");
const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: process.env.clientID,
  client_secret: process.env.clientSecret,
});

exports.getLoggedInUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const admin = await Admin.findOne({ organisation: user.organisation });

    var parking = await Parking.find({ organisationID: admin.id });

    return res.json({
      statusCode: 200,
      user: user,
      totalBooking: admin.parkingSlots,
      booked: parking.length,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, number, organisation } = req.body;
    var user = await User.findOne({ email });

    if (user) {
      return res.json({ statusCode: 400, message: "User Already Exists!" });
    }

    user = new User({ name, email, password, organisation, number });

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Token Generation
    const payload = {
      user: {
        id: user.id,
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
          message: "User Registered!",
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
    const { email, password, organisation } = req.body;

    var user = await User.findOne({
      email: email,
      organisation: organisation,
    });

    if (!user) {
      return res.json({ statusCode: 400, message: "User Doesnt Exists!" });
    }
    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ statusCode: 400, message: "Invalid Credentials" });
    }

    // Token Generation
    const payload = {
      user: {
        id: user.id,
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
          message: "User Logged-In!",
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

exports.bookParking = async (req, res) => {
  try {
    const { slotTime, vehicleInfo } = req.body;
    var user = await User.findById(req.user.id);
    var admin = await Admin.findOne({ organisation: user.organisation });
    var category = await Category.findOne({
      organisationID: admin.id,
      name: vehicleInfo.category,
    });

    var totalParkings = await Parking.find({ organisationID: admin.id });
    if (totalParkings.length >= admin.parkingSlots) {
      return res.json({
        statusCode: 400,
        message: "No Parking Slot Available!",
      });
    } else {
      var vehicle = new Vehicle({
        userID: req.user.id,
        ownerName: user.name,
        number: user.number,
        vehicleInfo,
      });
      await vehicle.save();

      const parkingObj = {
        organisationID: admin.id,
        userID: req.user.id,
        fees: category.fees,
        info: user,
        vehicleID: vehicle.id,
        vehicleInfo: vehicleInfo,
      };
      var parking = new Parking(parkingObj);
      var date = Date.now();
      var slipID = otpGenerator.generate(6, {
        upperCase: true,
        specialChars: false,
        digits: true,
        alphabets: true,
      });

      await pdf
        .create(
          pdfTemplate({
            orgName: admin.organisation,
            date:
              new Date().getDate() +
              "/" +
              new Date().getMonth() +
              "/" +
              new Date().getFullYear(),
            fees: category.fees,
            slipID,
            name: user.name,
            phone: user.number,
            slotDate: slotTime,
            vehicleModel: vehicleInfo.model,
            vehicleNumber: vehicleInfo.number,
          }),
          {}
        )
        .toFile(
          "./reciepts/" + req.user.id + "_" + date + "_parking.pdf",
          (err) => {
            if (err) {
              console.log(err.message);
              return;
            }
          }
        );
      parking.slip =
        "http://localhost:5000/reciepts/" +
        req.user.id +
        "_" +
        date +
        "_parking.pdf";
      await parking.save();
      var link;

      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://localhost:3001/",
          cancel_url: "http://localhost:3001/",
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  price: category.fees,
                  currency: "INR",
                  quantity: 1,
                },
              ],
            },
            amount: {
              currency: "INR",
              total: category.fees,
            },
            description: "Parking",
          },
        ],
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          throw error;
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === "approval_url") {
              return res.json({
                statusCode: 200,
                message: "Slot Booked!",
                link: payment.links[i].href,
              });
            }
          }
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Parking.findByIdAndDelete(req.params.id);
    return res.json({ statusCode: 200, message: "Booking Removed!" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getPrevParkings = async (req, res) => {
  try {
    var totalParkings = await Parking.find({ userID: req.user.id });
    return res.json(totalParkings);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    var user = await User.findById(req.user.id);

    var admin = await Admin.findOne({ organisation: user.organisation });
    var categories = await Category.find({ organisationID: admin.id });
    return res.json(categories);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAllOrganisations = async (req, res) => {
  try {
    var admin = await Admin.find().select("organisation");

    return res.json(admin);
  } catch (error) {
    console.log(error.message);
  }
};
