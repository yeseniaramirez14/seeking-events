const Event = require('../../models/event') 
const Organization = require('../../models/organization')
const { transformEvent, eventLoader } = require('./merge')


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
            const event = await Event.create({
                name: args.eventInput.name,
                dateTime: args.eventInput.dateTime,
                description: args.eventInput.description,
                createdBy: args.eventInput.createdBy
            })
            // update organization with new event 
            const createdBy = await Organization.findById(args.eventInput.createdBy)
            if (!createdBy) {
                throw new Error('Organization not found.');
            }
            createdBy.createdEvents.push(event);
            await createdBy.save();
            console.log("createdEvent")
            return transformEvent(event);
        } catch (err) {
            throw err;
        }
    },

    singleEvent: async eventId => {
        try {
            // const event = await Event.findById(eventId);
            // return transformEvent(event)
            // no need to transformEvent again because eventLoader
            // uses the event function which already transforms all the events
            console.log("1. singleEvent")
            const event = await eventLoader.load(eventId);
            if (!event) {
                throw new Error('Event ID does not exist')
            }
            console.log("Ending with returning event")
            return event
        } catch (err) {
            throw err;
        }
    },

    updateEvent: async args => {
        try {
            const event = await Event.findByIdAndUpdate(
                {_id: args.eventUpdateInput._id},
                {
                    name: args.eventUpdateInput.name,
                    dateTime: args.eventUpdateInput.dateTime,
                    description: args.eventUpdateInput.description
                },
                {returnDocument: "after", runValidators: true }
            )
            return transformEvent(event)
        } catch (err) {
            throw err;
        }
    },

    deleteEvent: async eventId => {
        try {
            const event = await Event.findById(eventId)
            await Organization.findByIdAndUpdate(
                {_id: event.createdBy},
                { $pull: {
                    createdEvents: event._id
                }},
                {returnDocument: "after", runValidators: true }
            )
            await Event.deleteOne({_id: eventId})
            return transformEvent(event)
        } catch (err) {
            throw err;
        }
    }
}