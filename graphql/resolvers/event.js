const Event = require('../../collections/event') 
const Organization = require('../../collections/organization');
const { orgExistsCheck, eventExistsCheck } = require('../../helpers/errorHandling');
const { transformEvent, eventLoader, organizationLoader } = require('./merge')


module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        }
    },

    createEvent: async args => {
        try {
            await orgExistsCheck(args.eventInput.organization)

            const event = await Event.create({
                name: args.eventInput.name,
                dateTime: args.eventInput.dateTime,
                description: args.eventInput.description,
                organization: args.eventInput.organization
            })
            
            await Organization.findByIdAndUpdate(
                {_id: args.eventInput.organization},
                { $push: {
                    createdEvents: event._id
                }},
                {new: true, runValidators: true}
            )

            organizationLoader.clear(args.eventInput.organization.toString())

            return transformEvent(event);
        } catch (err) {
            throw err;
        }
    },

    singleEvent: async eventId => {
        try {
            await eventExistsCheck(eventId)
            const event = await eventLoader.load(eventId);
            return event
        } catch (err) {
            throw err;
        }
    },

    updateEvent: async args => {
        try {
            await eventExistsCheck(args.eventUpdateInput._id)
            const event = await Event.findByIdAndUpdate(
                {_id: args.eventUpdateInput._id},
                {
                    name: args.eventUpdateInput.name,
                    dateTime: args.eventUpdateInput.dateTime,
                    description: args.eventUpdateInput.description
                },
                {returnDocument: "after", runValidators: true }
            )
            organizationLoader.clear(event.organization.toString())
            return transformEvent(event)
        } catch (err) {
            throw err;
        }
    },

    deleteEvent: async eventId => {
        try {
            await eventExistsCheck(eventId)
            const event = await Event.findById(eventId)

            await Organization.findByIdAndUpdate(
                {_id: event.organization},
                { $pull: {
                    createdEvents: event._id
                }},
                {returnDocument: "after", runValidators: true }
            )
            await Event.deleteOne({_id: eventId})
            organizationLoader.clear(event.organization.toString())
            return transformEvent(event)
        } catch (err) {
            throw err;
        }
    }
}