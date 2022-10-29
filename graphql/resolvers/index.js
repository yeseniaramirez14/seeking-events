const Organization = require('../../models/organization')
const Location = require('../../models/location') 
const Event = require('../../models/event') 


const organization = async organizationId => {
    try {
        const organization = await Organization.findById(organizationId)
            return { 
                ...organization._doc,
                createdAt: new Date(organization._doc.createdAt).toISOString(),
                createdLocations: locations.bind(this, organization._doc.createdLocations)
            };
        } catch (err) {
            throw err;
        }
};

const locations = async locationIds => {
    try {
        const locations = await Location.find({_id: {$in: locationIds}})
        locations.map(loc => {
            return { 
                ...loc._doc, 
                createdAt: new Date(loc._doc.createdAt).toISOString(),
                createdBy: organization.bind(this, loc.createdBy)
            };
        });
        return locations;
    } catch (err) {
        throw err;
    }
};

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return {
            ...event._doc,
            createdBy: organization.bind(this, event.createdBy)
        }
    } catch (err) {
        throw err;
    }
}
 

module.exports = {
    organizations: async () => {
        try {
            const organizations = await Organization.find()
            return organizations.map(org => {
                return { 
                    ...org._doc,
                    createdAt: new Date(org._doc.createdAt).toISOString(),
                };
            })
        } catch (err) {
            throw err;
        }
    },

    locations: async () => {
        try {
            const locations = await Location.find()
            return locations.map(loc => {
                return {
                    ...loc._doc,
                    createdAt: new Date(loc._doc.createdAt).toISOString(),
                    createdBy: organization.bind(this, loc._doc.createdBy)
                };
            })
        } catch (err) {
            throw err;
        }
    },

    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return { 
                    ...event._doc, 
                    createdBy: organization.bind(this, event._doc.createdBy),
                    createdAt: new Date(event._doc.createdAt).toISOString(),
                    updatedAt: new Date(event._doc.updatedAt).toISOString(),
                };
            });
        } catch (err) {
            throw err;
        }
    },

    createOrganization: async args => {
        try {
            const existingOrg = await Organization.findOne({ name: args.organizationInput.name })
            if (existingOrg) {
                throw new Error('Organization already exists.');
            } 
            const organization = new Organization({
                name: args.organizationInput.name,
                createdAt: new Date()
            })
    
            const result = await organization.save();
            return {
                ...result._doc,
                createdAt: result._doc.createdAt.toISOString(),
            } 
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
            createdAt: new Date(), 
            createdBy: '635c74dfd827df257016d544'
        })
        let createdLocation;
        try {
            const result = await location.save()
            createdLocation = {
                ...result._doc,
                createdAt: result._doc.createdAt.toISOString(),
                createdBy: organization.bind(this, result._doc.createdBy) 
            } 
            const createdBy = await Organization.findById('635c74dfd827df257016d544')
    
            if (!createdBy) {
                throw new Error('Organization not found.');
            }

            createdBy.createdLocations.push(location);
            await createdBy.save();
            return createdLocation;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    createEvent: async args => {
        const event = new Event({
            name: args.eventInput.name,
            dateTime: args.eventInput.dateTime,
            description: args.eventInput.description,
            createdBy: '635c74dfd827df257016d544'
        })
        const result = await event.save();
        return {
            ...result._doc,
            createdBy: organization.bind(this, event._doc.createdBy),
            createdAt: new Date(result._doc.createdAt).toISOString(),
            updatedAt: new Date(result._doc.updatedAt).toISOString(),
        }
    },

    deleteEvent: async args => {
        const event = await Event.findById(args._id)
        const eventName = event.name 
        await event.deleteOne({_id: args.eventId})
        return `${eventName} was successfully deleted.`
    }
}