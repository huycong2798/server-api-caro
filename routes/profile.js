const express = require("express");
const router = express.Router();
const passport = require('passport')
router.get('/',passport.authenticate('jwt',{session:false}), function(req, res, next) {
  const user = req.user;
  if(user)
  {
    res.send(user);
  }
  res.send("queo cute");
});

module.exports = router;