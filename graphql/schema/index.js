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

    input OrganizationInput {
        name: String!
    }

    input LocationInput {
        name: String!
        address: String!
        latitude: String!
        longitude: String!
    }

    type RootQuery {
        organizations: [Organization!]!
        locations: [Location!]!
    }

    type RootMutation {
        createOrganization(organizationInput: OrganizationInput): Organization 
        createLocation(locationInput: LocationInput): Location
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)