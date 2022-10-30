const Location = require('../../models/location') 
const Organization = require('../../models/organization') 
const { transformLocation } = require('./merge')


module.exports = {
    locations: async () => {
        try {
            const locations = await Location.find()
            return locations.map(loc => {
                return transformLocation(loc);
            })
        } catch (err) {
            throw err;
        }
    },

    createLocation: async args => {
        try {
            const location = await Location.create({
                name: args.locationInput.name, 
                address: args.locationInput.address, 
                latitude: args.locationInput.latitude, 
                longitude: args.locationInput.longitude, 
                createdBy: args.locationInput.createdBy
            })
            const createdBy = await Organization.findById(args.locationInput.createdBy)
            if (!createdBy) {
                throw new Error('Organization not found.');
            }
            createdBy.createdLocations.push(location);
            await createdBy.save();
            return transformLocation(location)
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    singleLocation: async locationId => {
        try {
            const location = await Location.findById(locationId);
            return transformLocation(location);
        } catch (err) {
            throw err;
        }
    }
}