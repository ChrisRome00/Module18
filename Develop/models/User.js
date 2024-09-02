const { Schema, model } = require('mongoose');

// Schema to create the User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
        type: String,
        unique: true,
        required: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/] // Taken from module 17 challenge
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought" 
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user" 
            }
        ]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

// Virtual Property called friendCount that retrieves the length of the users friends array on a query.
userSchema.virtual('friendCount')
    .get( function () {
        return this.friends.length; // friends is an array, so we can just send the length of that array to show the number of friends this user has
    });

// Initialize User model
const User = model('user', userSchema)

module.exports = User;