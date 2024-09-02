const router = require('express').Router();

const {
    getAllThoughts,
    GetSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction

} = require('../../controllers/thoughtController');

//  /api/thoughts

module.exports = router;