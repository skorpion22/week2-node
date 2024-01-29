const express = require('express');
const songRouter = require('./song.router');
const router = express.Router();

router.use('/songs', songRouter)


module.exports = router;