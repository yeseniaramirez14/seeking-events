const DataLoader = require('dataloader');

const Organization = require('../../models/organization') 
const Location = require('../../models/location') 
const Event = require('../../models/event') 
const { dateToString } = require('../../helpers/date')

const locationLoader = new DataLoader((locationIds) => {
    return locations(locationIds)
});
const eventLoader = new DataLoader((eventIds) => {
    return events(eventIds)
});

const transformLocation = loc => {
    return { 
        ...loc._doc, 
        createdAt: dateToString(loc._doc.createdAt),
        updatedAt: dateToString(loc._doc.updatedAt),
        createdBy: organization.bind(this, loc._doc.createdBy)
    }
}

const transformOrganization = org => {
    return { 
        ...org._doc,
        createdAt: dateToString(org._doc.createdAt),
        updatedAt: dateToString(org._doc.updatedAt),
        createdLocations: locations.bind(this, org._doc.createdLocations),
        createdEvents: events.bind(this, org._doc.createdEvents)
    };
}

const transformEvent = event => {
    return { 
        ...event._doc, 
        dateTime: dateToString(event._doc.dateTime),
        createdAt: dateToString(event._doc.createdAt),
        updatedAt: dateToString(event._doc.updatedAt),
        createdBy: organization.bind(this, event._doc.createdBy),
    }
}

const organization = async organizationId => {
    try {
        const organization = await Organization.findById(organizationId)
            return transformOrganization(organization);
    } catch (err) {
        throw err;
    }
};

const locations = async locationIds => {
    try {
        // $in operator in MongoDB selects documents where the value of a field equals any value in the specified array 
        const locations = await Location.find({_id: {$in: locationIds}})
        return locations.map(loc => {
            return transformLocation(loc);
        });
    } catch (err) {
        throw err;
    }
};

const events = async eventIds => {
    try {
        const events = await Event.find({_id: {$in: eventIds}})
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (err) {
        throw err;
    }
}

// exports.organization = organization;
// exports.locations = locations;
// exports.singleEvent = singleEvent;
exports.transformOrganization = transformOrganization;
exports.transformEvent = transformEvent;
exports.transformLocation = transformLocation;