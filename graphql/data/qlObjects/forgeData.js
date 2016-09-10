
import { GraphQLObjectType } from 'graphql';

import {
  connectionArgs,
  connectionFromArray,
} from 'graphql-relay';

import { CommentConnection } from './comment';
import { GameConnection } from './game';
import { UserConnection } from './user';
import { VideoConnection } from './video';

import { Game, Video, User, Comment } from '../database/models';

const ForgeDataType = new GraphQLObjectType({
  name: 'ForgeData',
  description: "GraphQL entry point to Forge 'Database'",
  fields: () => ({
    allComments: {
      type: CommentConnection,
      args: connectionArgs,
      resolve: async (_, args) => connectionFromArray(await Comment.find(), args),
    },
    allGames: {
      type: GameConnection,
      args: connectionArgs,
      resolve: async (_, args) => connectionFromArray(await Game.find(), args),
    },
    allUsers: {
      type: UserConnection,
      args: connectionArgs,
      resolve: async (_, args) => connectionFromArray(await User.find(), args),
    },
    allVideos: {
      type: VideoConnection,
      args: connectionArgs,
      resolve: async (_, args) => connectionFromArray(await Video.find(), args),
    },
  }),
});

export default ForgeDataType;
