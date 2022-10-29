const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'Organization'
        }
    },
        { timestamps: true }
)

module.exports = mongoose.model('Location', locationSchema)