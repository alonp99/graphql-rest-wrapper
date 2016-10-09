import express from 'express';
import gqlRestWrapper from 'graphql-rest-wrapper'

const app = express();

/**
 *  GraphQL rest wrapper takes all express-graphql options and some additional options
 *
 *  Options:
 *  - express-graphql: (Main ones)
 *  schema: GraphQLSchema
 *  graphiql: Boolean        -> Render GraphQL query client
 *
 *  - additional gqlRestWrapper options:
 *  name: String            -> Will name the main query, and file if asked for
 *  generateSchema: Boolean -> Generate schema from the API response
 *  saveSchema: Boolean     -> Save the generated schema to a javascript file
 *
 */

const wrapper = new gqlRestWrapper('https://www.bhphotovideo.com/bnh/controller/home/?A=getCartItems&groupItems=&O=&Q=json&_=1476002271204', {
    name: 'MyRestAPI',
    // generateSchema: true,
    // saveSchema: true,
    schema: require('./MyRestAPI'),
    graphiql: true
})

app.get('/restapi', (req, res)=> {
    res.send(
        {
            name : "john_s",
            first_name : "John",
            last_name : "Smith",
            display_name : "Johnny",
            id: 9,
            email : "user@example.test",
            password : {
                value : "my_password",
                hash : "0a0655l2hg32hbr2d23f239"
            },
            friends: ['Mike', 'Jen', 'Chris', 'Tom'],
            active : true
        });
});

app.use('/graphql', wrapper.expressMiddleware())

var server = app.listen(9090, () => {
    console.log('Listening at port', server.address().port);
});
