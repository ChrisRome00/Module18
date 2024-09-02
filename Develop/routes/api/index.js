const router = require('express').Router();
//import new api route files
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

//now it will be localhost:3001/api/extension
//router.use('/extention', newely imported api routes)
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;