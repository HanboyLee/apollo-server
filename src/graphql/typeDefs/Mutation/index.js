const { gql } = require('apollo-server-express');

const { GraphQLUpload } = require('graphql-upload');
const typeDefs = gql`
    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Mutation {
        editUserProfile(input: UserEditInput): UserProfile
        signupUser(UserCreateInput: UserCreateInput): User
        loginUser(UserCreateInput: UserCreateInput): User
        singleUpload(file: Upload!, size: Int!): File
    }
`;
//http://localhost:5500/graphql

const resolvers = {
    Upload: GraphQLUpload,
    Mutation: {
        signupUser: require('./User/signupUser'),
        loginUser: require('./User/loginUser'),
        editUserProfile: require('./User/editUserProfile'),
        singleUpload: require('./Media/singleUpload'),
    },
};

module.exports = { typeDefs, resolvers };
