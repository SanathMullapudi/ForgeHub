import express from 'express';
import graphQLHTTP from 'express-graphql';
import {schema} from './data/schema';

const GRAPHQL_PORT = 8080;

const graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({schema, graphiql: true, pretty: true}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
