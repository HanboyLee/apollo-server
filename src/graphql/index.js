const { makeExecutableSchema } = require('@graphql-tools/schema');

const Schema = require('./typeDefs');
module.exports.schema = makeExecutableSchema({ ...Schema });
