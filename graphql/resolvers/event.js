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
            const createdBy = await Organization.exists({_id: args.eventInput.createdBy})
            if (!createdBy) {
                throw new Error('Organization does not exist.');
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

            return transformEvent(event);
        } catch (err) {
            throw err;
        }
    },

    singleEvent: async eventId => {
        try {
            // no need to transformEvent again because eventLoader
            // uses the event function which already transforms all the events
            const eventExist = await Event.exists({_id: eventId})
            if (!eventExist) {
                throw new Error('Event does not exist.');
            }
            const event = await eventLoader.load(eventId);
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