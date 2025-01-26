import bcrypt from 'bcrypt';
import prisma from '../prisma/prismaClient.js';

const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
    users: async () => await prisma.user.findMany(),
  },
  Mutation: {
    createUser: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    },
  },
};

export default resolvers;
