import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';
import {
  connectionArgs,
  connectionFromArray,
} from 'graphql-relay';

import { CommentConnection } from './comment';
import { GameConnection } from './game';
import UserType, { UserConnection } from './user';
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
      args: {
        ...connectionArgs,
        shuffle: { type: GraphQLBoolean, description: 'To randomize order or not' },
        populate: { type: GraphQLString, description: 'JSON.stringify(mongodb populate object)' },
        query: { type: GraphQLString, description: 'JSON.stringify(mongodb query object)' },
        mSort: { type: GraphQLString, description: 'JSON.stringify({order: 1 or -1, by: name of field})' },
      },
      resolve: async (_, args) => connectionFromArray(await Video.getVids(args), args),
    },
    loggedInUser: {
      type: UserType,
      resolve: async (_, __, req) => {
        try { return await User.findById(req.user.id); }
        catch (err) {return null;}
      },
    },
    gamesByPopularity: {
      type: GameConnection,
      args: connectionArgs,
      resolve: async (_, args) => connectionFromArray(await Game.gamesByPopular(), args),
    },
  }),
});

export default ForgeDataType;
