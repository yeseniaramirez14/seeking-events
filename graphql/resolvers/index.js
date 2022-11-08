const orgResolver = require("./organization");
const locResolver = require("./location");
const eventResolver = require("./event");
const userResolver = require("./user")

const rootResolver = {
    ...orgResolver,
    ...locResolver,
    ...eventResolver,
    ...userResolver
};

module.exports = rootResolver;