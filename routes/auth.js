const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
// POST LOGIN
router.post("/login", (req, res, next) => {
  console.log('queo');
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Something is wrong",
        user: user
      });
    }
    req.logIn(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, "queocute_hjhj");
      return res.json({ user, token });
    });
  })(req, res);
});
module.exports = router;
