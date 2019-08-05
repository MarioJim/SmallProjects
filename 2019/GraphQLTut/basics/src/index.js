// import { gql } from 'graphql';
import { GraphQLServer } from 'graphql-yoga';

// Schema
const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }

  type Query {
    me: User!
    post: Post!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: '123123',
        name: 'Mike',
        email: 'mike@epicgames.com',
      };
    },
    post() {
      return {
        id: '123',
        title: 'Epic Book',
        body: 'Bla bla',
        published: true,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('The server is up!');
});
