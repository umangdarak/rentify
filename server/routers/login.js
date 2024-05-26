const Router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const buyer = require("./models/buyer");
const seller = require("./models/seller");
Router.post("/login", async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    if (userType == "buyer") {
      const user = await buyer.findOne({ email: email });
      if (!user) {
        return res
          .status(404)
          .json({ error: "No user found with that username" });
      }
      bcrypt.compare(password, user.password, (err, valid) => {
        if (err) {
          return res.status(500).json({ error: "Error comparing passwords" });
        }
        if (valid) {
          const token = jwt.sign({ email }, process.env.SECRET);
          res.status(200).json({
            email: user.email,
            token: token,
            id: user._id,
            phoneNumber: user.phoneNumber,
            firstName: user.firstName,
            lastName: user.lastName,
          });
        } else {
          res.status(401).json({ error: "Passwords do not match" });
        }
      });
    } else if ((userType == "seller")) {
      const user = await seller.findOne({ email: email });
      if (!user) {
        return res
          .status(404)
          .json({ error: "No user found with that username" });
      }
      bcrypt.compare(password, user.password, (err, valid) => {
        if (err) {
          return res.status(500).json({ error: "Error comparing passwords" });
        }
        if (valid) {
          const token = jwt.sign({ email }, process.env.SECRET);
          res.status(200).json({
            email: user.email,
            token: token,
            id: user._id,
            phoneNumber: user.phoneNumber,
            firstName: user.firstName,
            lastName: user.lastName,
          });
        } else {
          res.status(401).json({ error: "Passwords do not match" });
        }
      });
    } else {
      res.status(501).json("Error");
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" + err });
  }
});

Router.post("/register", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, userType } =
    req.body;
  const user1 = await buyer.findOne({ email: email });
  const user2 = await seller.findOne({ email: email });
  if (user1 || user2) {
    res.status(500).send("User already exists");
  } else {
    try {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          res.status(500).send("Error hashing password");
        }
        if (userType == "buyer") {
          const user = new buyer({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: hash,
          });
          const result = await user.save();
          if (result.error) {
            res.status(500).json("Error saving credentials");
          } else {
            res.status(201).json(result);
          }
        } else if (userType == "seller") {
          const user = new seller({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: hash,
          });
          const result = await user.save();
          if (result.error) {
            res.status(500).json("Error saving credentials");
          } else {
            res.status(201).json(result);
          }
        }
      });
    } catch (e) {
      res.status(500).json({ error: "Internal server error" + e });
    }
  }
});


module.exports=Router;
