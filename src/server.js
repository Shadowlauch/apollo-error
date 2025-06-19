import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const peopleData = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" }
];

// GraphQL schema
const typeDefs = gql`
  type Person {
    id: ID!
    name: String!
  }

  type Query {
    people(test: String!): [Person!]!
  }

  type Mutation {
    editFirstPerson(name: String!): Person
  }
`;

// Resolvers
const resolvers = {
    Query: {
        people: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async operation
            return peopleData
        }
    },
    Mutation: {
        editFirstPerson: (_, { name }) => {
            const person = peopleData[0]; // Get the first person
            if (!person) return null;
            return { ...person, name: name }; // simulate mutation
        }
    }
};

// App setup
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function start() {
    await server.start();
    server.applyMiddleware({ app });
    app.listen(4000, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

start();
