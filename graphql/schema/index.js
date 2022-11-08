const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Organization {
        _id: ID!
        name: String!
        createdAt: String!
        updatedAt: String!
        employees: [User!]
        createdLocations: [Location!]
        createdEvents: [Event!]
    }

    type Location {
        _id: ID!
        name: String!
        address: String!
        latitude: Float!
        longitude: Float!
        createdAt: String!
        updatedAt: String!
        organization: Organization!
    }

    type Event {
        _id: ID!
        name: String!
        dateTime: String!
        description: String!
        createdAt: String!
        updatedAt: String!
        organization: Organization!
    }
    
    type User {
        _id: ID!
        name: String!
        username: String!
        email: String!
        password: String
        organization: Organization!
        createdAt: String!
        updatedAt: String!
    }

    input LocationInput {
        name: String!
        address: String!
        organization: ID!
    }

    input LocationUpdateInput {
        _id: ID!
        name: String
        address: String
    }

    input EventInput {
        name: String!
        dateTime: String!
        description: String!
        organization: ID!
    }

    input EventUpdateInput {
        _id: ID!
        name: String
        dateTime: String
        description: String
    }

    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
        organization: ID!
    }

    input UserUpdateInput {
        _id: ID!
        name: String
        username: String
        email: String
        password: String
    }

    type RootQuery {
        organizations: [Organization!]!
        singleOrganization(_id: ID!): Organization
        locations: [Location!]!
        singleLocation(_id: ID!): Location
        events: [Event!]! 
        singleEvent(_id: ID!): Event
        users: [User!]!
        singleUser(_id: ID!): User
    }

    type RootMutation {
        createOrganization(name: String!): Organization 
        createLocation(locationInput: LocationInput): Location
        updateLocation(locationUpdateInput: LocationUpdateInput): Location
        deleteLocation(_id: ID!): Location
        createEvent(eventInput: EventInput): Event
        updateEvent(eventUpdateInput: EventUpdateInput): Event
        deleteEvent(_id: ID!): Event
        createUser(userInput: UserInput): User
        updateUser(userUpdateInput: UserUpdateInput): User
        deleteUser(_id: ID!): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)