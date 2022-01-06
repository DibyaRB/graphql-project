const express = require('express');

const {buildSchema} = require('graphql');

const {graphqlHTTP} = require('express-graphql');

const axios= require('axios');

const app = express();

//In graphql we have different scalar types ID, String, Int, Float, Boolean, List - []

 //Create a custom GraphQL Object type

 let message = "This is a message";

const schema = buildSchema(`

    type Post{
        userId: Int
        id: Int
        title: String
        body: String
    }

    type User{
        name: String
        age: Int
        college: String
    }

    type Query {
        hello: String
        welcomeMessage(name: String, dayOfWeek: String!): String
        getUser: User
        getUsers: [User]
        getPostsFromExternalAPI: [Post],
        message: String
    }

    type Mutation{
        setMessage(newMessage: String) : String 
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
    },
    getUsers:()=>{
        return [user]
    },

    getPostsFromExternalAPI:async ()=>{
        const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return result.data;
    },
    setMessage:({newMessage})=>{
        message= newMessage;
        return message;
    },
    message:()=>{
        return message;
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