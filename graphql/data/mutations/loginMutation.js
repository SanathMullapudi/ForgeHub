import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import {
  mutationWithClientMutationId,
} from 'graphql-relay';

import User from '../database/models/user';

export default GraphQLLoginMutation = mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    username: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({token}) => token,
    },
  },
  mutateAndGetPayload: async ({username, password}) => {
    const token = await User.login(username, password);
    return {token};
  },
});
