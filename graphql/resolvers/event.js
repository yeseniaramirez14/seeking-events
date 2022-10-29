const Event = require('../../models/event') 
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
        const result = await event.save();
        return transformEvent(result)
    },

    deleteEvent: async args => {
        const event = await Event.findById(args._id)
        const eventName = event.name 
        await event.deleteOne({_id: args.eventId})
        return `${eventName} was successfully deleted.`
    }
}