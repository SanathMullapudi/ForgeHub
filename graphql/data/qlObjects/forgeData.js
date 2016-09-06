
import { GraphQLObjectType } from 'graphql';

import {
  connectionArgs,
  connectionFromArray,
} from 'graphql-relay';

import { GameConnection } from './game';
import { UserConnection } from './user';
import { VideoConnection } from './video';

import { getGames, getUsers, getVideos } from '../databases/forgeDatabase';

const ForgeDataType = new GraphQLObjectType({
  name: 'ForgeData',
  description: "GraphQL entry point to Forge 'Database'",
  fields: () => ({
    allGames: {
      type: GameConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getGames(), args),
    },
    allUsers: {
      type: UserConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getUsers(), args),
    },
    allVideos: {
      type: VideoConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getVideos(), args),
    },
  }),
});

export default ForgeDataType;
