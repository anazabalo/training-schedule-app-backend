import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import router from './src/routes/userRoutes.js';

import typeDefs from './src/graphql/typeDefs.js';
import resolvers from './src/graphql/resolvers.js';

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(cors());
  app.use(express.json());
  app.use('/api/users', router);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use('/graphql', expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
  });
};

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
