const Organization = require('../../models/organization')
const { locations, transformOrganization } = require('./merge')



module.exports = {
    organizations: async () => {
        try {
            const organizations = await Organization.find()
            // console.log("orgs", organizations)
            return organizations.map(org => {
                console.log("org", locations)
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

}