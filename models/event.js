const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'Organization'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema)