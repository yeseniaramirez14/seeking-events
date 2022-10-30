const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Organization {
        _id: ID!
        name: String!
        createdAt: String!
        updatedAt: String!
        createdLocations: [Location!]
        createdEvents: [Event!]
    }

    type Location {
        _id: ID!
        name: String!
        address: String!
        latitude: String!
        longitude: String!
        createdAt: String!
        updatedAt: String!
        createdBy: Organization!
    }

    type Event {
        _id: ID!
        name: String!
        dateTime: String!
        description: String!
        createdAt: String!
        updatedAt: String!
        createdBy: Organization!
    }

    input LocationInput {
        name: String!
        address: String!
        latitude: String!
        longitude: String!
        createdBy: ID!
    }

    input LocationUpdateInput {
        _id: ID!
        name: String
        address: String
        latitude: String
        longitude: String
    }

    input EventInput {
        name: String!
        dateTime: String!
        description: String!
        createdBy: ID!
    }

    input EventUpdateInput {
        _id: ID!
        name: String
        dateTime: String
        description: String
    }

    type RootQuery {
        organizations: [Organization!]!
        singleOrganization(_id: ID!): Organization
        locations: [Location!]!
        singleLocation(_id: ID!): Location
        events: [Event!]! 
        singleEvent(_id: ID!): Event
    }

    type RootMutation {
        createOrganization(name: String!): Organization 
        createLocation(locationInput: LocationInput): Location
        updateLocation(locationUpdateInput: LocationUpdateInput): Location
        deleteLocation(_id: ID!): Location
        createEvent(eventInput: EventInput): Event
        updateEvent(eventUpdateInput: EventUpdateInput): Event
        deleteEvent(_id: ID!): Event
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)