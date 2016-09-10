import express from 'express';
import mongoose from 'mongoose';
import graphQLHTTP from 'express-graphql';
import {schema} from './data/schema';

// Temporary spot to fire scrapper till mutation is implemented
import {fireScrapper} from './data/database/load';
// fireScrapper().then(res => {console.log(res);});

const GRAPHQL_PORT = 8080;
const mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/ForgeHub';

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, function (err) {
  err ? console.log('Mongo error: ', err) : console.log(`MongoDB connected to ${mongoUrl}`);
});

const graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({schema, graphiql: true, pretty: true}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
