var express = require("express");
var router = express.Router();
const userModel = require("../model/user");
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

/* GET user profile. */
router.get("/profile", function(req, req, next) {
  console.log("queocute");
  res.send('qweuqwueqw');
});
router.post("/register", async (req, res) => {
  console.log("queocute",req.body.password);
  const email = '123@gmail.com';
  const user = await userModel.get(email);
  console.log(user);
  if (user) {
    res.send("tk da ton tai");
  }
  //await userModel.register(email,email);
  res.send(email);
});
module.exports = router;
