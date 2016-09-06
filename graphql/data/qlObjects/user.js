
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay';

import { nodeInterface } from '../relayNode';
import { VideoConnection } from './video';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User Data.',
  fields: () => ({
    id: globalIdField('User'),
    name: { type: GraphQLString },
    pic: { type: GraphQLString },
    href: { type: GraphQLString },
    videos: {
      type: VideoConnection,
      args: connectionArgs,
      resolve: (obj, args) => connectionFromArray(obj.videos, args),
    },
  }),
  interfaces: () => [nodeInterface],
});

export default UserType;

export const {
  connectionType: UserConnection,
} = connectionDefinitions({
  name: 'UserConnect',
  nodeType: UserType,
});
