import express from "express";
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";

const app = express();
const PORT = process.env.PORT ?? 9090;

app.use(express.static("public"));

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "world",
      },
    },
  }),
});

app.all("/graphql", createHandler({ schema }));

app.listen(PORT, console.log("Server started listening on PORT", PORT));
