
import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import { nodeField } from './relayNode';
import ForgeDataType from './qlObjects/forgeData';

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    forgeData: {
      type: ForgeDataType,
      resolve: () => true,
    },
    node: nodeField,
  },
});

export const schema = new GraphQLSchema({
  query: Root,
});
