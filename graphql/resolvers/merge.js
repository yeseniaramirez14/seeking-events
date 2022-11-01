const DataLoader = require('dataloader');

const Organization = require('../../models/organization') 
const Location = require('../../models/location') 
const Event = require('../../models/event') 
const { dateToString } = require('../../helpers/date')


// A batch loading function accepts an Array of keys, 
// and returns a Promise which resolves to an Array of values*.
const locationLoader = new DataLoader((locationIds) => {
    console.log("locationloader")
    return locations(locationIds)
});
const eventLoader = new DataLoader((eventIds) => {
    console.log("eventLoader", eventIds)
    return events(eventIds)
});

const organizationLoader = new DataLoader((organizationIds) => {
    // console.log("dd", Organization.find({_id: { $in: organizationIds}}))
    console.log("organizationLoader", organizationIds)
    return organizations(organizationIds);
    // return Organization.find({_id: { $in: organizationIds}})
})

const transformLocation = loc => {
    return { 
        ...loc._doc, 
        createdAt: dateToString(loc._doc.createdAt),
        updatedAt: dateToString(loc._doc.updatedAt),
        createdBy: organization.bind(this, loc._doc.createdBy)
    }
}

const transformOrganization = org => {
    console.log("transform organization", org)
    return { 
        ...org._doc,
        createdAt: dateToString(org.createdAt),
        updatedAt: dateToString(org.updatedAt),
        // createdLocations: locations.bind(this, org._doc.createdLocations),
        // createdEvents: events.bind(this, org._doc.createdEvents)
        // instead we will use the eventLoader 
        createdLocations: () => locationLoader.loadMany(org.createdLocations),
        createdEvents: () => eventLoader.loadMany(org.createdEvents)
    };
}

const transformEvent = event => {
    console.log("transform event", event)
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
        console.log("organization")
        // const organization = await Organization.findById(organizationId)
        const organization = await organizationLoader.load(organizationId.toString())
        console.log("after load")
        // const organization = await Organization.find({ _id: {$in: organizationId}})
        return organization;
    } catch (err) {
        throw err;
    }
};

const organizations = async organizationIds => {
    try {
        // $in operator in MongoDB selects documents where the value of 
        // a field equals any value in the specified array 
        console.log("organizations")
        const organizations = await Organization.find({_id: {$in: organizationIds}})
        console.log("organizations2.0 after finding org", organizations)
        return organizations.map(org => {
            return transformOrganization(org);
        });
    } catch (err) {
        throw err;
    }
};

const locations = async locationIds => {
    try {
        // $in operator in MongoDB selects documents where the value of 
        // a field equals any value in the specified array 
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
        console.log("events", eventIds)
        const events = await Event.find({_id: {$in: eventIds}})
        console.log("events2.0 - found events", events)
        return events.map(event => {
            console.log("mapping..", event)
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
exports.organizationLoader = organizationLoader;
exports.eventLoader = eventLoader;