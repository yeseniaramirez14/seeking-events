const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Organization {
        _id: ID!
        name: String!
        createdAt: String
        updatedAt: String
        createdLocations: [Location!]
    }

    type Location {
        _id: ID!
        name: String!
        address: String!
        latitude: String!
        longitude: String!
        createdAt: String
        updatedAt: String
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

    input OrganizationInput {
        name: String!
    }

    input LocationInput {
        name: String!
        address: String!
        latitude: String!
        longitude: String!
    }

    input EventInput {
        name: String!
        dateTime: String!
        description: String!
    }

    input EventFilter {
        name: String!
    }


    type RootQuery {
        organizations: [Organization!]!
        locations: [Location!]!
        events: [Event!]! 
    }

    type RootMutation {
        createOrganization(organizationInput: OrganizationInput): Organization 
        createLocation(locationInput: LocationInput): Location
        createEvent(eventInput: EventInput): Event
        deleteEvent(_id: ID!): String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)

// deleteEvent(eventId: ID!): Event!
