const Organization = require('../../collections/organization');
const { transformOrganization, organizationLoader } = require('./merge');
const {orgExistsCheck} = require('../../helpers/errorHandling')



module.exports = {
    organizations: async () => {
        try {
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
            await orgExistsCheck(orgId)

            const org = await organizationLoader.load(orgId);
            return org
        } catch (err) {
            throw err;
        }
    }
}

