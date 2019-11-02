import { schemas, resolvers } from "./backend/graphql";
import { ApolloServer } from "apollo-server-express";

import express from "express";
import next from "next";
import cors from "cors";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
import path from "path";

// Connect to mongodb using mongoose
import { config } from "dotenv";
config({ path: path.resolve(__dirname, "../.env") });

import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", async function() {
  console.log("Connected to database");
});

const apolloServer = new ApolloServer({
  typeDefs: schemas,
  resolvers: resolvers,
  context: ({ req, res }) => {
    return { req, res };
  }
});

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(
      cors({
        credentials: true,
        origin: "http://localhost:3000"
      })
    );
    apolloServer.applyMiddleware({ app: server, path: "/api", cors: false });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
