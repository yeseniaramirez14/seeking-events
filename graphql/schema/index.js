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

    input EventInput {
        name: String!
        dateTime: String!
        description: String!
        createdBy: ID!
    }

    type RootQuery {
        organizations: [Organization!]!
        singleOrganization(_id: ID!): Organization
        locations: [Location!]!
        singleLocation(_id: ID!): Location
        events: [Event!]! 
    }

    type RootMutation {
        createOrganization(name: String!): Organization 
        createLocation(locationInput: LocationInput): Location
        createEvent(eventInput: EventInput): Event
        deleteEvent(_id: ID!): String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)