
import {
  GraphQLInt,
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
import GameType from './game';
import UserType from './user';
import { UserConnection } from './user';

const VideoType = new GraphQLObjectType({
  name: 'Video',
  description: 'Video Data.',
  fields: () => ({
    id: globalIdField('Video'),
    title: { type: GraphQLString },
    pic: { type: GraphQLString },
    src: { type: GraphQLString },
    likes: { type: GraphQLInt },
    author: { type: UserType },
    game: { type: GameType },
    viewers: {
      type: UserConnection,
      args: connectionArgs,
      resolve: (obj, args) => connectionFromArray(obj.viewers, args),
    },
    viewersCount: {
      type: GraphQLInt,
      resolve: (obj, args) => obj.viewers.length,
    },
  }),
  interfaces: () => [nodeInterface],
});

export default VideoType;

export const {
  connectionType: VideoConnection,
} = connectionDefinitions({
  name: 'VideoConnect',
  nodeType: VideoType,
});
