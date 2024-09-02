const router = require('express').Router();

const {
    getAllUsers,   //GET
    getSingleUser, //GET
    createUser,    //POST
    updateUser,    //PUT
    deleteUser,    //DELETE
    addFriend,     //POST
    removeFriend   //DELETE
} = require('../../controllers/userController');

//   /api/users
router.route('/')
        .get(getAllUsers)
        .post(createUser);

//   /api/users/:userId
router.route('/:userId')
        .get(getSingleUser)
        .put(updateUser)
        .delete(deleteUser);

//   /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
        .post(addFriend)
        .delete(removeFriend);

module.exports = router;