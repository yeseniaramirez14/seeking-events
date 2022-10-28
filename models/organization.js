const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    },
    createdLocations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Location'
        }
    ]
});

module.exports = mongoose.model('Organization', organizationSchema);