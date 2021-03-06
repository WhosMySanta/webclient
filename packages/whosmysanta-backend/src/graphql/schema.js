import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {
  addFriendMutation as addFriend,
  updateFriendMutation as updateFriend,
  deleteFriendMutation as deleteFriend,
  addGroupMutation as addGroup,
  deleteGroupMutation as deleteGroup,
} from './mutations';
import {friends, groups} from './queries';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    friends,
    groups,
  },
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addFriend,
    updateFriend,
    deleteFriend,
    addGroup,
    deleteGroup,
  },
});

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
