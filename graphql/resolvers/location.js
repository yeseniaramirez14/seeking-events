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
        const location = new Location({
            name: args.locationInput.name, 
            address: args.locationInput.address, 
            latitude: args.locationInput.latitude, 
            longitude: args.locationInput.longitude, 
            createdBy: '635c74dfd827df257016d544'
        })
        try {
            const result = await location.save()
            const createdBy = await Organization.findById('635c74dfd827df257016d544')
            if (!createdBy) {
                throw new Error('Organization not found.');
            }
            createdBy.createdLocations.push(location);
            await createdBy.save();
            return transformLocation(result)
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}