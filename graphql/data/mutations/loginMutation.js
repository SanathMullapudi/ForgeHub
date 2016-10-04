import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import {
  mutationWithClientMutationId,
} from 'graphql-relay';

import {User} from '../database/models';

export default GraphQLLoginMutation = mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    username: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    token: { type: GraphQLString },
    name: { type: GraphQLString },
    pic: { type: GraphQLString },
  },
  mutateAndGetPayload: async ({username, password}) => await User.login(username, password),
});
