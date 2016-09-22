import express from 'express';
import mongoose from 'mongoose';
import graphQLHTTP from 'express-graphql';
import {schema} from './data/schema';
import {authMW} from './scripts/auth';

const GRAPHQL_PORT = process.env.PORT || 8080;
const mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/ForgeHub';

console.log('here', mongoUrl);

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, function (err) {
  err ? console.log('Mongo error: ', err) : console.log(`MongoDB connected to ForgeHub`);
});

const graphQLServer = express();
graphQLServer.use('/', authMW, graphQLHTTP({schema, graphiql: true, pretty: true}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on `
));
