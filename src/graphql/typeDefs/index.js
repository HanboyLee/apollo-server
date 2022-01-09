const _ = require('lodash');

const compose = [require('./Query'), require('./UserTypes'), require('./Mutation'), require('./MediaTypes')];
const typeDefs = compose.reduce(
    ({ typeDefs, resolvers }, types) => {
        return {
            typeDefs: types.typeDefs ? typeDefs.concat(types.typeDefs) : typeDefs,
            resolvers: _.merge(resolvers, types.resolvers),
        };
    },
    {
        typeDefs: [],
        resolvers: {},
    }
);

module.exports = typeDefs;
