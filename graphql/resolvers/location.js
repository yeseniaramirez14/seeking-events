const Location = require('../../models/location') 
const Organization = require('../../models/organization') 
const { transformLocation, locationLoader } = require('./merge')


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
            const createdBy = await Organization.exists({_id: args.locationInput.createdBy})
            if (!createdBy) {
                throw new Error('Organization not found.');
            }
            const location = await Location.create({
                name: args.locationInput.name, 
                address: args.locationInput.address, 
                latitude: args.locationInput.latitude, 
                longitude: args.locationInput.longitude, 
                createdBy: args.locationInput.createdBy
            })
            // createdBy.createdLocations.push(location);
            // await createdBy.save();

            await Organization.findByIdAndUpdate(
                {_id: args.locationInput.createdBy},
                { $push: {
                    createdLocations: location._id
                }},
                {new: true, runValidators: true}
            )

            return transformLocation(location)
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    singleLocation: async locationId => {
        try {
            const locExist = await Location.exists({_id: locationId});
            if (!locExist) {
                throw new Error('Location does not exist.')
            }
            const location = await locationLoader.load(locationId);
            return location
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