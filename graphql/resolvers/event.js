const Event = require('../../models/event') 
const Organization = require('../../models/organization')
const { transformEvent, eventLoader } = require('./merge')


module.exports = {
    events: async () => {
        try {
            console.log("events")
            const events = await Event.find();
            console.log("events2.0", events)
            return events.map(event => {
                console.log("event mapping", event)
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        }
    },

    createEvent: async args => {
        try {
            const createdBy = await Organization.findById(args.eventInput.createdBy)
            if (!createdBy) {
                throw new Error('Organization not found.');
            }
            const event = await Event.create({
                name: args.eventInput.name,
                dateTime: args.eventInput.dateTime,
                description: args.eventInput.description,
                createdBy: args.eventInput.createdBy
            })
            // update organization with new event 

            await Organization.findByIdAndUpdate(
                {_id: args.eventInput.createdBy},
                { $push: {
                    createdEvents: event._id
                }},
                {new: true, runValidators: true}
            )

            // await Event.findByIdAndUpdate(
            //     {_id: event._id}, 
            //     { $set: 
            //         { $push: {
            //             "createdBy.$.createdEvents": event._id
            //         }}
            //     },
            //     {new: true, runValidators: true}
            // )

            // createdBy.createdEvents.push(event);
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
            const eventExist = await Event.findById(eventId)
            if (!eventExist) {
                throw new Error('Event does not exist.');
            }
            const event = await eventLoader.load(eventId);
            // if (!event) {
            //     throw new Error('Event ID does not exist')
            // }
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