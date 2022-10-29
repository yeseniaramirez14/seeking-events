const Organization = require('../../models/organization') 
const Location = require('../../models/location') 
const Event = require('../../models/event') 
const { dateToString } = require('../../helpers/date')


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
        createdLocations: locations.bind(this, org._doc.createdLocations)
    };
}

const transformEvent = event => {
    return { 
        ...event._doc, 
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
        const locations = await Location.find({_id: {$in: locationIds}})
        return locations.map(loc => {
            return transformLocation(loc);
        });
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

// exports.organization = organization;
// exports.locations = locations;
// exports.singleEvent = singleEvent;
exports.transformOrganization = transformOrganization;
exports.transformEvent = transformEvent;
exports.transformLocation = transformLocation;