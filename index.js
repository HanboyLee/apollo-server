const express = require('express');
const cors = require('cors');
const { genertorUser } = require('./services/generatorFake');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const { graphqlUploadExpress } = require('graphql-upload');
//test db
const { User } = require('./src/models');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5500;
//router
// const router = require('./src/routers');
// app.use('/', router);

//Apollo grahql
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const path = require('path');

const apolloServer = new ApolloServer({
    schema: require('./src/graphql').schema,
    context: async ({ req, res }) => {
        try {
            const authorization = req.headers.authorization;
            const auth = authorization.split(' ') || '';
            if (!auth[0] && auth[0] !== 'Bearer') {
                auth[0].replace(auth[0], 'Bearer');
            }
            if (!auth[1]) {
                delete req.headers.authorization;
                delete req.user;
                return 'undefined';
            }
            const token = auth[1];
            const user = jwt.verify(token, process.env.SECRETKEY);

            req.user = await User.findById(user._id);
            req.user.id = user._id;
            req.user.token = token;

            return {
                ...req,
            };
        } catch (err) {
            throw new AuthenticationError('令牌無效', err);
        }
    },
    formatError: (err) => {
        // Don't give the specific errors to the client.
        if (err.message.startsWith('Database Error: ')) {
            return new Error('Internal server error');
        }
        // Otherwise return the original error. The error can also
        // be manipulated in other ways, as long as it's returned.
        return err;
    },
    uploads: false,
});

//mongodb
const mongoose = require('mongoose');
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
        console.log('connect to DB!');
    }
);
apolloServer.start().then((res) => {
    // This middleware should be added before calling `applyMiddleware`.
    app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000, maxFiles: 10 }));

    apolloServer.applyMiddleware({
        app,
        path: '/graphql',
        cors: false,
        bodyParserConfig: false,
    });

    app.listen(PORT, async () => {
        // const data = await Promise.resolve(genertorUser());
        // console.log(data);
        // const user = await User.insertMany(data);
        // const user = await User.find({});
        // console.log(user, '??');
        // const ids = user.map((item) => item._id.toString());

        // const del = await User.deleteMany({ _id: { $in: ids } });
        // console.log(del);
        console.log(`Server on ${PORT} port start.`);
    });
});
