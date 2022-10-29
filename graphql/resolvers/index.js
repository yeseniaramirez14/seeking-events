const orgResolver = require("./organization");
const locResolver = require("./location");
const eventResolver = require("./event");

const rootResolver = {
    ...orgResolver,
    ...locResolver,
    ...eventResolver
};

module.exports = rootResolver;