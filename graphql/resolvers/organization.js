const Organization = require('../../models/organization')
const { transformOrganization, organizationLoader } = require('./merge')


module.exports = {
    organizations: async () => {
        try {
            // mongoose find function allows you to query for documents with the given key(s)/value(s) 
            // and it will return an array of documents that match the given filter. 
            // no parameters will return all documents 
            const organizations = await Organization.find()
            return organizations.map(org => {
                return transformOrganization(org);
            })
        } catch (err) {
            throw err;
        }
    },

    createOrganization: async args => {
        try {
            const existingOrg = await Organization.findOne({ name: args.name })
            if (existingOrg) {
                throw new Error('Organization already exists.');
            } 
            const organization = await Organization.create({
                name: args.name,
            })
                return transformOrganization(organization)
        } catch (err) {
            throw err;
        }
    },

    singleOrganization: async orgId => {
        try {
            const orgExist = await Organization.findById(orgId);
            if (!orgExist) {
                throw new Error('Organization does not exist.')
            }
            const org = await organizationLoader.load(orgId);
            return org
        } catch (err) {
            throw err;
        }
    }
}

