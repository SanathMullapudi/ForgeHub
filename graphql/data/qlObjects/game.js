
import {
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

const GameType = new GraphQLObjectType({
  name: 'Game',
  description: 'Game Data.',
  fields: () => ({
    id: globalIdField('Game'),
    name: { type: GraphQLString },
    href: { type: GraphQLString },
    videos: {
      type: VideoConnection,
      args: connectionArgs,
      resolve: (obj, args) => connectionFromArray(obj.videos, args),
    },
  }),
  interfaces: () => [nodeInterface],
});

export default GameType;

export const {
  connectionType: GameConnection,
} = connectionDefinitions({
  name: 'GameConnect',
  nodeType: GameType,
});
