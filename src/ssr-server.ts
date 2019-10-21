import express from 'express';
import next from 'next';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { config } from 'dotenv';
import path from 'path';

import { schemas, resolvers } from './backend/graphql';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to mongodb using mongoose
config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.MONGODB_URI) {
  console.log('> Warning: add MONGODB_URI to .env file')
}
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async function() {
  console.log('> Connected to database');
});

const apolloServer = new ApolloServer({
  typeDefs: schemas,
  resolvers: resolvers,
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
