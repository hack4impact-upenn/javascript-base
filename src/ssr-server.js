import graphql from "./backend/graphql";
import { ApolloServer } from "apollo-server-express";

import express from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// import { EmailService } from "./services/email-service";
//let mailer = new EmailService("Subject", "Body", "test@example.com");

const EmailService = require("./services/email-service").default;

// Connect to mongodb using mongoose
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const models = require("./backend/models");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", async function() {
  console.log("Connected to database");
});

const apolloServer = new ApolloServer({
  typeDefs: graphql.schema,
  resolvers: graphql.resolvers,
  playground: true
});

app
  .prepare()
  .then(() => {
    const server = express();
    apolloServer.applyMiddleware({ app: server, path: "/api" });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });

    // TODO: delete later (sorry)
    let mailer = new EmailService("Subject", "Body", "test@example.com");
    mailer
      .sendTo()
      .then(response => console.log(response))
      .catch(err => console.log(err.message));
    return;
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "test@example.com",
      from: "test@example.com",
      subject: "Sending with Twilio SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>"
    };
    sgMail
      .send(msg)
      .then(response => console.log(response))
      .catch(error => console.log(error.message));
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
