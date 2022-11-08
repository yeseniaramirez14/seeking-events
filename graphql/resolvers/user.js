const bcrypt = require('bcryptjs');

const User = require('../../collections/user'); 
const {transformUser, userLoader, organizationLoader } = require('./merge');
const Organization = require('../../collections/organization');
const { userExistsCheck } = require('../../helpers/errorHandling');

module.exports = {
    createUser: async args => {
        try {
            const existingUsername = await User.findOne({ username: args.userInput.username })
            if (existingUsername) {
                throw new Error('Username already taken. Please choose a different username.');
            } 
            const existingEmail = await User.findOne({ email: args.userInput.email })
            if (existingEmail) {
                throw new Error('Email exists already.')
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = await User.create({
                name: args.userInput.name,
                username: args.userInput.username,
                email: args.userInput.email,
                password: hashedPassword,
                organization: args.userInput.organization
            })

            await Organization.findByIdAndUpdate(
                {_id: args.userInput.organization},
                { $push: {
                    employees: user._id
                }},
                {new: true, runValidators: true}
            )

            organizationLoader.clear(args.userInput.organization.toString())

            return transformUser(user)
        } catch (err) {
            throw err;
        }
    },

    singleUser: async userId => {
        try {
            await userExistsCheck(userId)
            const user = await userLoader.load(userId)
            return user 
        } catch (err) {
            throw err;
        }
    },

    users: async () => {
        try {
            const users = await User.find();
            return users.map(user => {
                return transformUser(user)
            })

        } catch (err) {
            throw err;
        }
    },

    updateUser: async args => {
        try {
            await userExistsCheck(args.userUpdateInput._id)

            const hashedPassword = await bcrypt.hash(args.userUpdateInput.password, 12);

            const user = await User.findByIdAndUpdate(
                {_id: args.userUpdateInput._id},
                {
                    name: args.userUpdateInput.name,
                    username: args.userUpdateInput.username,
                    email: args.userUpdateInput.email,
                    password: hashedPassword
                },
                {returnDocument: "after", runValidators: true}
            )

            organizationLoader.clear(user.organization.toString())
            return transformUser(user)
        } catch (err) {
            throw err;
        }
    },

    deleteUser: async userId => {
        try {
            await userExistsCheck(userId)
            const user = await User.findById(userId)

            await Organization.findByIdAndUpdate(
                {_id: user.organization},
                {$pull: {
                    employees: user._id
                }},
                {returnDocument: "after", runValidators: true}
            )

            await User.deleteOne({_id: userId})
            organizationLoader.clear(user.organization.toString())
            return transformUser(user)

        } catch (err) {
            throw err;
        }
    }
}