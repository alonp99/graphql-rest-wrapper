const {
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')


const PasswordType = new GraphQLObjectType({
    name: 'password',
    fields: {
        value: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString)
        },
        hash: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
});


module.exports = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        name: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString)
        },
        first_name: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString)
        },
        last_name: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString)
        },
        display_name: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString)
        },
        id: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLID)
        },
        email: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString)
        },
        value: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString)
        },
        hash: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            description: 'enter your description',
            type: new GraphQLNonNull(PasswordType)
        },
        friends: {
            description: 'enter your description',
            type: new GraphQLNonNull(new GraphQLList(GraphQLString))
        },
        active: {
            description: 'enter your description',
            type: new GraphQLNonNull(GraphQLBoolean)
        }
    })
})