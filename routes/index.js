const router = require('express').Router();
const notesRouter = require('./notes');


router.use('/notes', notesRouter);
// Import our modular routers for /db

module.exports = router;
