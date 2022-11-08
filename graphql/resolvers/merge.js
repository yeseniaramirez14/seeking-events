const DataLoader = require('dataloader');

const User = require('../../collections/user')
const Organization = require('../../collections/organization') 
const Location = require('../../collections/location') 
const Event = require('../../collections/event') 
const { dateToString } = require('../../helpers/date')


// A batch loading function accepts an Array of keys, 
// and returns a Promise which resolves to an Array of values*.
const locationLoader = new DataLoader((locationIds) => {
    return locations(locationIds)
});

const eventLoader = new DataLoader((eventIds) => {
    return events(eventIds)
});

const organizationLoader = new DataLoader((organizationIds) => {
    return organizations(organizationIds);
})

const userLoader = new DataLoader((userIds) => {
    return users(userIds)
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
    console.log("transformOrgs:", org)
    return { 
        ...org._doc,
        createdAt: dateToString(org._doc.createdAt),
        updatedAt: dateToString(org._doc.updatedAt),
        employees: () => userLoader.loadMany(org.employees),
        createdLocations: () => locationLoader.loadMany(org.createdLocations),
        createdEvents: () => eventLoader.loadMany(org.createdEvents)
        // createdLocations: locations.bind(this, org._doc.createdLocations),
        // createdEvents: events.bind(this, org._doc.createdEvents)
        // instead we will use the eventLoader 
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

const transformUser = user => {
    return { 
        ...user._doc,
        password: null,
        createdAt: dateToString(user._doc.createdAt),
        updatedAt: dateToString(user._doc.updatedAt),
        organization: organization.bind(this, user._doc.organization)
    }
}

const user = async userId => {
    try {
        const user = await userLoader.load(userId.toString())
        return user 
    } catch (err) {
        throw err;
    }
}

const users = async userIds => {
    try {
        console.log("inside users")
        const users = await User.find({_id: {$in: userIds}})
        console.log("users:", users)
        return users.map(user => {
            return transformUser(user);
        })
    } catch (err) {
        throw err;
    }
}

const organization = async organizationId => {
    try {
        const organization = await organizationLoader.load(organizationId.toString())
        return organization;
    } catch (err) {
        throw err;
    }
};

const organizations = async organizationIds => {
    try {
        // $in operator in MongoDB selects documents where the value of 
        // a field equals any value in the specified array 
        const organizations = await Organization.find({_id: {$in: organizationIds}})
        return organizations.map(org => {
            return transformOrganization(org);
        });
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

exports.transformOrganization = transformOrganization;
exports.transformEvent = transformEvent;
exports.transformLocation = transformLocation;
exports.transformUser = transformUser;
exports.organizationLoader = organizationLoader;
exports.eventLoader = eventLoader;
exports.locationLoader = locationLoader;
exports.userLoader = userLoader;