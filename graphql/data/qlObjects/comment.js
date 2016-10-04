
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
import VideoType from './video';
import UserType from './user';

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'Comment Data.',
  fields: () => ({
    id: globalIdField('Comment'),
    message: { type: GraphQLString },
    author: { type: UserType, resolve: obj => obj.fetch('author')},
    parentVid: { type: VideoType, resolve: obj => obj.fetch('parentVid')},
  }),
  interfaces: () => [nodeInterface],
});

export default CommentType;

export const {
  connectionType: CommentConnection,
  edgeType: CommentEdge,
} = connectionDefinitions({
  name: 'CommentConnect',
  nodeType: CommentType,
});
