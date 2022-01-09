const { gql } = require('apollo-server-express');
const __ = require('lodash');
const { User } = require('../../../models/User');
// const { deepClone } = require('../../../utils/common');
const typeDefs = gql`
    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).

    type Query {
        # user user gogo
        getMe: User
        getUsers: [User]
    }
`;

const resolvers = {
    Query: {
        getUsers: async () => {
            const users = await User.find({});
            // const deepCloneUsers = __.deepClone(users);
            // console.log(users);
            // const convertUser = deepCloneUsers.map((item) => {
            //     return { id: item._id, ...item };
            // });

            return users;
        },
        getMe: async (_, __, req) => req.user,
    },
};

module.exports = { typeDefs, resolvers };
