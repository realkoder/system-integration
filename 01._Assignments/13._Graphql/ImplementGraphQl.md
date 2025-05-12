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

---

<br>

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

---

<br>

### WHat is resolvers

In _GraphQL_, resolvers are functions that are responsible for returning the data for a specific field in your schema either for `Query, Mutation or Subscription`. They act as the bridge between the _GraphQL_ queries and the underlying data sources, such as databases, APIs, or other services.

Whenever a type has a field that is more complex than a simple scalar type like `String, Int, Float, Boolean, ID`, it typically requires a _resolver_ to fetch or compute the value for that field.

---

<br>

# Test the Graphql with Postman

Follow these steps to test your GraphQL API using Postman:

## 1. Set the Request Type

- Change the request type from "GET" to "POST" using the dropdown menu.

## 2. Enter the Request URL

- In the URL field, enter the endpoint for your GraphQL server:
  ```
  http://localhost:4000/graphql
  ```

## 3. Set the Headers

- Click on the "Headers" tab and add the following key-value pair:
  - **Key**: `Content-Type`
  - **Value**: `application/json`

## 4. Write the GraphQL Query

- Click on the _"Body"_ tab.
- Select the _"GraphQL"_ option.

```graphql
query Author {
  author(id: 3) {
    id
    name
    books {
        title
        releaseYear
    }
  }
}
```

---

### Example Query

_To fetch books, you might use:_

```graphql
query Book {
  book(id: "1") {
    title
    releaseYear
  }
}
```

---

### Example Mutation

_Create a new author:_

```graphql
mutation createAuthor {
  createAuthor(name: "Franz Kafka") {
    id
    name
  }
}
```

_Create new a book with the new author:_

```graphql
mutation createBook {
  createBook(authorId: "5", title: "The Trial", releaseYear: 1950) {
    id
    title
    author {
      name
      id
    }
  }
}
```

---

### Example Subscription

_Listen for when new book arrives:_

```graphql
subscription BookAdded {
  bookAdded {
    title
    releaseYear
    author {
      name
    }
  }
}
```
