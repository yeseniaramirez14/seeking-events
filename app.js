const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
// valid middleware function 
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

dotenv.config()

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    //schemas, resolvers 
    schema: graphQlSchema,
    // object that has all the resolver functions in it and the resolver functions need to match our schema endpoints by name 
    rootValue: graphQlResolvers,
    graphiql: true
})
);  

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


