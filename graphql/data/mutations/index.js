import {GraphQLObjectType} from 'graphql';

import GraphQLLoginMutation from './loginMutation';
import GraphQLAddCommentMutation from './addCommentMutation';

export default Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    login: GraphQLLoginMutation,
    addComment: GraphQLAddCommentMutation,
  }),
});
