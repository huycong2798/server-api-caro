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
  const email = req.body.email
  const password = req.body.password
  const user = await userModel.get(email);
  const json = {"returncode":0,"returnmessage":""};
  console.log(user);
  if (user) {
    json["returnmessage"] = "Tai khoan da ton tai";
  }
  else
  {
    let result = await userModel.register(email,password);
    if(result)
    {
      json["returncode"] = 1
      json["returnmessage"] = "Dang ki thanh cong";

    }
    else
    {
      json["returnmessage"] = "Dang ki that bai";
    }
  }
  res.send(json);
  
});
module.exports = router;
