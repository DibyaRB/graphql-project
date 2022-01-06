const express = require('express');

const {buildSchema} = require('graphql');

const {graphqlHTTP} = require('express-graphql');

const app = express();

//In graphql we have different scalar types, Strings, Integers, Float, Boolean, List

const schema = buildSchema(`
    type Query {
        hello: String
        welcomeMessage(name: String): String
    }
`);

//root contains all the resolvers for our queries or mutations

const root = {
    hello: () =>{
        return "Hello World!";
    },
    welcomeMessage: (args) =>{
        console.log(args);
        return 'Hey Hows Life ' + " "+  args.name;
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql:true,
    schema: schema,
    rootValue: root
}))

app.listen(4000, ()=>{
    console.log('Server on port 4000')
});