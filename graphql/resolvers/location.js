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
    },

    updateLocation: async args => {
        try {            
            const location = await Location.findByIdAndUpdate(
                {_id: args.locationUpdateInput._id},
                {
                    name: args.locationUpdateInput.name, 
                    address: args.locationUpdateInput.address, 
                    latitude: args.locationUpdateInput.latitude, 
                    longitude: args.locationUpdateInput.longitude
                },
                {returnDocument: "after", runValidators: true }
            )
            return transformLocation(location)
        } catch (err) {
            throw err;
        }
    },

    deleteLocation: async locationId => {
        try {
            const location = await Location.findById(locationId)
            await Organization.findByIdAndUpdate(
                {_id: location.createdBy},
                { $pull: {
                    createdLocations: location._id
                }},
                {returnDocument: "after", runValidators: true}
            )
            await Location.deleteOne({_id: locationId})
            return transformLocation(location)
        } catch (err) {
            throw err;
        }
    }
}