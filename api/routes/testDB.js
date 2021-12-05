const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", function(req, res, next) {
    // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    let message = '';
    switch(mongoose.connection.readyState){
        case 0:
            message = 'DB is disconnected';
            break;
        case 1:
            message = 'DB is Connected';
            break;
        case 2:
            message = 'DB is Connecting';
            break;
        case 3: 
            message = 'DB is Disconnecting';
            break;
        default:
            message = 'DB is in unexpected state';
    }
    res.send(message);
});

module.exports = router;