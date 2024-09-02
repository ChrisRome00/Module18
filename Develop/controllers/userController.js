const User = require('../models/User');
const Thoughts = require('../models/Thought')
// const Thoughts = require('../models/Thought');

module.exports = {
    async getAllUsers (req,res) {
        try{
            const allUsers = await User.find();
            return res.status(200).json(allUsers);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async getSingleUser (req, res) {
        try{
            const singleUser = await User.findOne({ _id: req.params.userId}).select('-__v');
            if (!singleUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            return res.status(200).json(singleUser);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async createUser (req, res) {
        try {
            const newUser = await User.create(req.body);
            return res.status(200).json(newUser);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async updateUser (req, res) {
        try {
            const updatingUser = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $set: req.body },
                { runValidators: true, new: true }
            );
            return res.status(200).json(updatingUser);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async deleteUser (req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.userId})
            if (!deletedUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            // BONUS: Delete the Thoughts associated with this user
            await Thoughts.deleteMany({ _id: { $in: deletedUser.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async addFriend (req, res) {
        try{
            const user = await User.findOneAndUpdate(
               {_id: req.params.userId},
               {$addToSet: {friends: req.params.friendId}},
               {new: true}
            ); 
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            return res.status(200).json({
                message: "New Friend Added Successfully", 
                user: user
            });
        } catch (err) {
            return res.status(500).json(err); 
        }
    },
    async removeFriend (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {new: true}
            );
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err); 
        }
    }
};