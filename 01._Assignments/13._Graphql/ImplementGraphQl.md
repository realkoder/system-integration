# 13a GraphQL

# Graphql

_GraphQL_ is a query language for APIs and a runtime for executing those queries with your existing data. It provides a more efficient, powerful, and flexible alternative to RESTful APIs.
It fixes **underfetching & overfetching**

1. Query

```graphql
query Query {
  author(id: 3) {
    id
    name
    books {
      title
    }
  }
}
```

2. mutation

```graphql
mutation {
  createUser(name: "John Doe", email: "john@example.com") {
    id
    name
  }
}
```

3. Subscription

```graphql
subscription {
  messageSent {
    id
    content
    sender {
      name
    }
  }
}
```

## Apollo Server

**Apollo Server** is an open-source _GraphQL server_ that simplifies building and deploying _GraphQL APIs_. It includes a built-in _GraphQL Playground_ that provides a graphical interface for testing queries and mutations directly in the browser.

### Example:

```javascript
import { ApolloServer, gql } from "apollo-server";

// Define schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};

// Create server
const server = new ApolloServer({ typeDefs, resolvers });

// Start server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

### WHat is resolvers

In GraphQL, resolvers are functions that are responsible for returning the data for a specific field in your schema. They act as the bridge between the GraphQL queries and the underlying data sources, such as databases, APIs, or other services. Each field in a GraphQL schema can have its own resolver function, allowing for fine-grained control over how data is fetched and returned.
