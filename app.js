
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
// valid middleware function 
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Organization = require('./models/organization')
const Location = require('./models/location')

dotenv.config()

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    //schemas, resolvers 
    schema: buildSchema(`
        type Organization {
            _id: ID!
            name: String!
            createdAt: String
            updatedAt: String
        }

        type Location {
            _id: ID!
            name: String!
            address: String!
            latitude: String!
            longitude: String!
            createdAt: String
            updatedAt: String
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
    `),
    // object that has all the resolver functions in it and the resolver functions need to match our schema endpoints by name 
    rootValue: {
        organizations: () => {
            return Organization.find()
                .then(organizations => {
                    return organizations.map(org => {
                        return { ...org._doc };
                    })
                }).catch(err => {
                    throw err;
                });
        },

        locations: () => {
            return Location.find()
                .then(locations => {
                    return locations.map(loc => {
                        return {...loc._doc};
                    })
                }).catch(err => {
                    throw err;
                });
        },

        createOrganization: (args) => {
            return Organization.findOne({ name: args.organizationInput.name })
                .then(organization => {
                    if (organization) {
                        throw new Error('Organization already exists.');
                    } else {
                        const organization = new Organization({
                            name: args.organizationInput.name,
                            createdAt: Date.now()
                        })
            
                        return organization
                            .save()
                            .then(result => {
                                console.log(result);
                                return {...result._doc} 
                            })
                            .catch(err => {
                                console.log(err);
                                throw err;
                            });
                    }
                })
        },

        createLocation: args => {
            const location = new Location({
                name: args.locationInput.name, 
                address: args.locationInput.address, 
                latitude: args.locationInput.latitude, 
                longitude: args.locationInput.longitude, 
                createdAt: Date.now(), 
                createdBy: '635b683f133b046672ad0eda'
            })
            let createdLocation;
            return location 
                .save()
                .then(result => {
                    createdLocation = {...result._doc} 
                    return Organization.findById('635b683f133b046672ad0eda')
                })
                .then(organization => {
                    if (!organization) {
                        throw new Error('Organization not found.');
                    }
                    organization.createdLocations.push(location);
                    return organization.save();
                })
                .then(result => {
                    return createdLocation;
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        }
    },
    graphiql: true
})
);  

// app.use('/graphql', graphqlHTTP({ schema: schema.schema, graphiql: true}));  

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.5wjwmnc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(3000, () => {
            console.log("GraphQL server running at http://localhost:3000"); 
        });
    })
    .catch(err => {
        console.log(err);
    });


