const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Hello world!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to the Database Successfully");
    return server.listen({ port: 3001 });
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`);
  });
