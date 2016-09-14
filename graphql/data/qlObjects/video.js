
import {
  GraphQLInt,
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
import UserType, { UserConnection } from './user';
import { CommentConnection } from './comment';

const VideoType = new GraphQLObjectType({
  name: 'Video',
  description: 'Video Data.',
  fields: () => ({
    id: globalIdField('Video'),
    title: { type: GraphQLString },
    pic: { type: GraphQLString },
    src: { type: GraphQLString },
    timeAgo: { type: GraphQLString },
    likes: { type: GraphQLInt },
    views: { type: GraphQLInt },
    author: { type: UserType, resolve: obj => obj.fetch('author')},
    game: { type: GameType, resolve: obj => obj.fetch('game')},
    viewedBy: {
      type: UserConnection,
      args: connectionArgs,
      resolve: async (obj, args) => connectionFromArray(await obj.fetch('viewedBy'), args),
    },
    likedBy: {
      type: UserConnection,
      args: connectionArgs,
      resolve: async (obj, args) => connectionFromArray(await obj.fetch('likedBy'), args),
    },
    comments: {
      type: CommentConnection,
      args: connectionArgs,
      resolve: async (obj, args) => connectionFromArray(await obj.fetch('comments'), args),
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
