import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import {
  mutationWithClientMutationId,
  cursorForObjectInConnection,
  fromGlobalId,
} from 'graphql-relay';

import {emitMessageToRoom} from '../../server';

import {Video} from '../database/models';

import VideoType from '../qlObjects/video';
import {CommentEdge} from '../qlObjects/comment';

export default GraphQLAddCommentMutation = mutationWithClientMutationId({
  name: 'AddComment',
  inputFields: {
    message: {type: new GraphQLNonNull(GraphQLString)},
    vidId: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    newCommentEdge: {
      type: CommentEdge,
      resolve: ({comment, comments, populatedComment}) => ({
        cursor: cursorForObjectInConnection(comments, comment),
        node: populatedComment,
      }),
    },
    video: { type: VideoType },
  },
  mutateAndGetPayload: async ({vidId, message}, {authUser}) => { // could always use more err handling/validation
    if (authUser) {
      emitMessageToRoom(vidId, {options: 'Object for future use, when we override Relay.Store instead of forceRefresh'});
      const video = await Video.makeAndAddCommentToVid({userId: authUser.id, vidId: fromGlobalId(vidId).id, message});
      const populatedComment = (await video.fetch('comments'))[video.comments.length - 1];
      return {
        comments: video.comments,
        comment: video.comments[video.comments.length - 1],
        populatedComment,
        video,
      };
    }
    return Error('Unauthorized Action');
  },
});
