const Organization = require('../../models/organization')
const { locations, transformOrganization } = require('./merge')


module.exports = {
    organizations: async () => {
        try {
            // mongoose find function allows you to query for documents with the given key(s)/value(s) and it will return an array of documents that match the given filter. 
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
            const organization = new Organization({
                name: args.name,
            })
    
            const result = await organization.save();
            return transformOrganization(result)
        } catch (err) {
            throw err;
        }
    },

    singleOrganization: async orgId => {
        try {
            const org = await Organization.findById(orgId);
            return transformOrganization(org)
        } catch (err) {
            throw err;
        }
    }

}