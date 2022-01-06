const express = require('express');

const {buildSchema} = require('graphql');

const {graphqlHTTP} = require('express-graphql');

const app = express();

//In graphql we have different scalar types ID, String, Int, Float, Boolean, List - []

 //Create a custom GraphQL Object type

const schema = buildSchema(`

    type User{
        name: String
        age: Int
        college: String
    }

    type Query {
        hello: String
        welcomeMessage(name: String, dayOfWeek: String!): String
        getUser: User
    }

   
`);



const user ={
    name: 'Dibya',
    age: 28,
    college: 'KIIT University'
};

//root contains all the resolvers for our queries or mutations

const root = {
    hello: () =>{
       // return "Hello World!";
       return null;
    },
    welcomeMessage: (args) =>{
      //  console.log(args);
        return 'Hey Hows Life ' + " "+  args.name + "Today is " + args.dayOfWeek;
    },

    getUser: ()=>{
            return user;
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