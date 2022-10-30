const Event = require('../../models/event') 
const Organization = require('../../models/organization')
const { singleEvent, transformEvent } = require('./merge')


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
        const event = new Event({
            name: args.eventInput.name,
            dateTime: args.eventInput.dateTime,
            description: args.eventInput.description,
            createdBy: '635c74dfd827df257016d544'
        })
        try {
            const result = await event.save();
            const createdBy = await Organization.findById('635c74dfd827df257016d544')
            if (!createdBy) {
                throw new Error('Organization not found.');
            }
            createdBy.createdEvents.push(event);
            await createdBy.save();
            return transformEvent(result);
        } catch (err) {
            throw err;
        }
    },

    deleteEvent: async args => {
        const event = await Event.findById(args._id)
        const eventName = event.name 
        await event.deleteOne({_id: args.eventId})
        return `${eventName} was successfully deleted.`
    }
}