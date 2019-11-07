var express = require('express');
var router = express.Router();

/* GET home page. */
let userQueue = []
router.get('/findroom', (req, res) => {
  try {
    const socketId = req.query.socketId;
    const io = req.app.get('io');
    const user = {
        socketId,
        roomId: socketId,
        playFirst: "true",
      };
      if (userQueue.length > 100) {
        userQueue = [];
        const err = "sap server"
        return res.status(500).json({ err });
      }
      userQueue.push(user);
      if(userQueue.length % 2 === 0)
      {
        let idRoom= userQueue[userQueue.length-2].roomId
        user.playFirst = "false";
        userQueue[userQueue.length - 1].roomId = idRoom;
        console.log('match neee', userQueue);
        user.roomId = idRoom;
      }
      io.in(user.socketId).emit('FIND_ROOM', user);
      res.end();
  }
  catch(err){
    console.log("err----",err)
    return res.status(500).json({ err });
  }
});

module.exports = router;
