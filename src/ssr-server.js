import graphql from './backend/graphql';
import { ApolloServer } from 'apollo-server-express';

import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
import path from 'path';

// Connect to mongodb using mongoose
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const models = require('./backend/models');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async function() {
  console.log('Connected to database');
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
    apolloServer.applyMiddleware({ app: server, path: '/api' });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });

  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
