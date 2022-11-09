const Organization = require("../collections/organization");
const Event = require("../collections/event")
const Location = require("../collections/location")
const User = require("../collections/user")

module.exports = {
    orgExistsCheck: async orgId => {
        const orgExist = await Organization.exists({_id: orgId});
        if (!orgExist) {
            throw new Error('Organization does not exist.')
        }   
    },

    eventExistsCheck: async eventId => {
        const eventExist = await Event.exists({_id: eventId})
        if (!eventExist) {
            throw new Error('Event does not exist.')
        }
    },

    locExistsCheck: async locId => {
        const locExist = await Location.exists({_id: locId})
        if (!locExist) {
            throw new Error('Location does not exist.')
        }
    },

    userExistsCheck: async userId => {
        const userExist = await User.exists({_id: userId})
        if (!userExist) {
            throw new Error('User does not exist.')
        }
    }
}
