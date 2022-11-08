const mongoose = require('mongoose');

// calling Schema class
const Schema = mongoose.Schema;

// creating Structure of the collections
const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        dateTime: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        organization: {
            type: Schema.Types.ObjectId,
            ref: 'Organization'
        }
    },
    { timestamps: true }
);

// creating collection 
module.exports = mongoose.model('Event', eventSchema)