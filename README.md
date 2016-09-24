## Introduction

graphql-rest-wrapper let you use GraphQL on top of your existing REST API very easily. using [express-graphql](https://github.com/graphql/express-graphql).
See code example

## Code Example
The following code will fetch the REST API response, make a GraphQL schema for you, and expose the data from a GraphQL server.

```javascript
const wrapper = new gqlRestWrapper('http://localhost:9090/restapi', {
    name: 'MyRestAPI',
    generateSchema: true,
    saveSchema: true,
    graphiql: true
})

app.use('/graphql', wrapper.expressMiddleware())
```

## How does it work

1. When instantiating 'gqlRestWrapper' class, a GraphQL schema will be made for you from the REST API response. (you can provide a schema yourself)
2. GraphQL wrapper will expose the express middleware function to a chosen route.
3. When you will send an http request to the route with GraphQL query, GraphQL server will fetch the response from the REST API and send you only the data you asked for.


## Installation

Install the [npm package](https://www.npmjs.com/package/graphql-rest-wrapper)
```javascript
npm i graphql-rest-wrapper
```

import
```javascript
var gqlRestWrapper = require(graphql-rest-wrapper)
```

Instantiate:
```javascript
/**
 *  GraphQL rest wrapper takes all express-graphql options and some additional options.
 *
 *  Options object:
 *
 *  - express-graphql: (Main ones)
 *  schema: GraphQLSchema    -> You can specify a schema or let gqlRestWrapper to generate one with [generateSchema: true]
 *  graphiql: Boolean        -> Render GraphQL query client
 *
 *  - gqlRestWrapper:
 *  name: String            -> Will name the main query, and file if asked for
 *  generateSchema: Boolean -> Generate schema from the API response
 *  saveSchema: Boolean     -> Save the generated schema to a javascript file
 *
 */

new gqlRestWrapper([ENDPOINT], [OPTIONS])
```

attach middleware to a route
```javascript
app.use([ROUTE], wrapper.expressMiddleware())
```

Sending a query:
Simplest way to send a query is using GraphiQL, by setting it to 'true' and just navgating to GraphQL route.
Or making an HTTP GET/POST request:
```javascript
fetch("http://localhost:9090/graphql",
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: "{'query': 'query { MyRestAPI { id, name } }'}"
    })
    .then(function (res) {
        console.log(res);
    })
```
## Schema builder

The GraphQL schema is being built with a modified version of [Aweary/json-to-graphql](https://github.com/Aweary/json-to-graphql "Aweary/json-to-graphql") package it will work for simple data structures like I use in the example code:
```javascript
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
}
```
But can fall short on more complex data structures, In those cases it needs some help.
Just use [saveSchema: true] and tweak it the way you like. then import the file and pass it to the wrapper:
```javascript
new gqlRestWrapper([ENDPOINT], {
    name: 'MyRestAPI',
    //generateSchema: true,
    //saveSchema: true,
    schema: require(./schema-file)
    graphiql: true
})
```
## Tests



## Contributors



## License

MIT