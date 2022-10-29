const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organizationSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        createdLocations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Location'
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Organization', organizationSchema);