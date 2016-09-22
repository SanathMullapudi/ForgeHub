import {GraphQLObjectType} from 'graphql';
import GraphQLLoginMutation from './loginMutation';

export default Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    login: GraphQLLoginMutation,
  }),
});
