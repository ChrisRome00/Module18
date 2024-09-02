const { Schema, model } = require('mongoose');
const reactionSchemaCall = require('./Reaction');

// Schema to create the Thout model
const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt:{
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query z
        },
        username:{
            type: String,
            required: true
        },
        reactions:[reactionSchemaCall]
    },
    {
        toJSON: {
            virtuals: true,
          },
          id: false,
    }
);

// Virtual property called reactionCount that retrievs the length if the thoughts reactions array field on query
thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;