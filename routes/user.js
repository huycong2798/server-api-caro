var express = require("express");
var router = express.Router();
const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// POST LOGIN
router.post("/login", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        returncode: 0,
        returnmessage: info ? info.message : err
      });
    } else {
      req.logIn(user, err => {
        if (err) {
          res.send(err);
        }

        const token = jwt.sign({ id: user.email }, "jwt-secret");
        return res.status(200).json({
          returncode: 1,
          returnmessage: "Logged in successfully!",
          token: token
        });
      });
    }
  })(req, res, next);
});
/* GET users listing. */
router.get("/", function(req, res) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await userModel.get(email);
  const json = { returncode: 0, returnmessage: "" };
  let stt = 400;
  if (user) {
    json["returnmessage"] = "Tai khoan da ton tai";
  } else {
    let result = await userModel.register(email, password);
    if (result) {
      json["returncode"] = 1;
      json["returnmessage"] = "Dang ki thanh cong";
      stt = 200;
    } else {
      json["returnmessage"] = "Dang ki that bai";
    }
  }
  res.status(stt).send(json);
});
module.exports = router;
