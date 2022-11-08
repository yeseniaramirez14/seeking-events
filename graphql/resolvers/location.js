const Location = require('../../collections/location') 
const Organization = require('../../collections/organization') 
const { transformLocation, locationLoader, organizationLoader } = require('./merge')
const getLatLong = require('../../helpers/googleGeocode')
const { orgExistsCheck, locExistsCheck } = require('../../helpers/errorHandling');


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
            await orgExistsCheck(args.locationInput.organization)
            
            const locationInfo = await getLatLong(args.locationInput.address)

            const location = await Location.create({
                name: args.locationInput.name, 
                address: args.locationInput.address, 
                latitude: locationInfo[0].latitude, 
                longitude: locationInfo[0].longitude, 
                organization: args.locationInput.organization
            })

            await Organization.findByIdAndUpdate(
                {_id: args.locationInput.organization},
                { $push: {
                    createdLocations: location._id
                }},
                {new: true, runValidators: true}
            )

            organizationLoader.clear(args.locationInput.organization.toString())

            return transformLocation(location)
        } catch (err) {
            throw err;
        }
    },

    singleLocation: async locationId => {
        try {
            await locExistsCheck(locationId)
            const location = await locationLoader.load(locationId);
            return location
        } catch (err) {
            throw err;
        }
    },

    updateLocation: async args => {
        try {       
            await locExistsCheck(locationId)     
            const locationInfo = await getLatLong(args.locationUpdateInput.address)

            const location = await Location.findByIdAndUpdate(
                {_id: args.locationUpdateInput._id},
                {
                    name: args.locationUpdateInput.name, 
                    address: args.locationUpdateInput.address, 
                    latitude: locationInfo[0].latitude, 
                    longitude: locationInfo[0].longitude, 
                },
                {returnDocument: "after", runValidators: true }
            )
            organizationLoader.clear(location.organization.toString())
            return transformLocation(location)
        } catch (err) {
            throw err;
        }
    },

    deleteLocation: async locationId => {
        try {
            await locExistsCheck(locationId)     
            const location = await Location.findById(locationId)

            await Organization.findByIdAndUpdate(
                {_id: location.organization},
                { $pull: {
                    createdLocations: location._id
                }},
                {returnDocument: "after", runValidators: true}
            )
            await Location.deleteOne({_id: locationId})
            organizationLoader.clear(location.organization.toString())
            return transformLocation(location)
        } catch (err) {
            throw err;
        }
    }
}