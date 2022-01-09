const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Upload
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
`;

module.exports = { typeDefs };
