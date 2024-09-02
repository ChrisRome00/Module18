const {Thought, User} = require('../models');

module.exports = {
    async getAllThoughts (req, res) {
        try{
            const allThoughts = await Thought.find();
            return res.status(200).json(allThoughts);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async getSingleThought (req, res) {
        try{
            const singleThought = await Thought.findOne({ _id: req.params.thoughtId});
            return res.status(200).json(singleThought);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async createThought (req, res) {
        try {
            const newThought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: newThought._id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({
                  message: 'Video created, but found no user with that ID',
                });
            }
            return res.status(200).json({
                message: 'New Thought Created Successfully!',
                thought: newThought
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async updateThought (req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No Thought with this id!' });
            }
            return res.status(200).json({
                message: 'Thought Updated Successfully!',
                updatedThought: thought
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async deleteThought (req, res) {
        try {
            const deleteThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
            if (!deleteThought) {
                return res.status(404).json({ message: 'No Thought with this id!' });
            };
            return res.status(200).json({
                message: "Successfully Deleted Thought"
            })
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async createReaction (req, res) {
        try {
            const createdReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {reactions: req.body} },
                { new: true }
            );
    
            if(!createdReaction){
                return res.status(400).json({message: "No Thought with this id!"});
            }

            res.status(200).json({message: `Reaction Successfully Added`});
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async deleteReaction (req,res) {
        try {
            const removedReaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                { $pull: {reactions: {reactionId: req.params.reactionId}} },
                { new: true }
            );
    
            if(!removedReaction){
                return res.status(400).json({message: "No Thought with this id!"});
            }
            res.status(200).json({message: `Reaction Successfully Removed!`});
        }catch(err){
            res.status(500).json(err);
        }
    },

}