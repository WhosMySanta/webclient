const {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');

const {mutationWithClientMutationId} = require('graphql-relay');


const GROUPS = [
  {
    id: '123a',
    title: 'Adams Family',
    description: 'Secret santa group for the Adams family',
  },
  {
    id: '321b',
    title: 'Holmes Family',
    description: 'Secret santa group for the Holmes family',
  },
];

export const GroupType = new GraphQLObjectType({
  name: 'Group',
  fields: () => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
  }),
});

export const GroupInputType = new GraphQLInputObjectType({
  name: 'GroupInput',
  fields: () => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
  }),
});

const AppType = new GraphQLObjectType({
  name: 'App',
  fields: () => ({
    groups: {type: new GraphQLList(GroupType)},
    id: {type: GraphQLString},
    group: {
      type: GroupType,
      args: {
        id: {type: GraphQLString},
      },
      resolve: (_, {id}) => GROUPS.find((group) => group.id === id),
    },
  }),
});

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    app: {
      type: AppType,
      resolve: () => ({
        group: (_, {id}) => GROUPS.find((group) => group.id === id),
        groups: GROUPS,
        id: '0',
      }),
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'GroupMutations',
  fields: () => ({
    createGroup: mutationWithClientMutationId({
      name: 'CreateGroup',
      inputFields: {
        id: {type: GraphQLString},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
      },
      outputFields: {
        app: {
          type: AppType,
          resolve: () => GROUPS,
        },
      },
      mutateAndGetPayload: ({title, description}) => {
        const id = title.toLowerCase().replace(' ', '-');
        const payload = {
          id,
          title,
          description,
        };

        GROUPS.push(payload);

        return payload;
      },
    }),
  }),
});

export const Schema = new GraphQLSchema({
  query: Root,
  mutation: MutationType,
});
