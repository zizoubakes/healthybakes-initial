import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { client, writeClient } from './sanity';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Fetch customer from Sanity
        const query = `*[_type == "customer" && email == $email][0] {
          _id,
          email,
          name,
          passwordHash
        }`;

        const customer = await client.fetch(query, {
          email: credentials.email as string,
        });

        if (!customer) {
          return null;
        }

        // Verify password
        const isValid = await bcrypt.compare(
          credentials.password as string,
          customer.passwordHash
        );

        if (!isValid) {
          return null;
        }

        return {
          id: customer._id,
          email: customer.email,
          name: customer.name,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// Helper function to create a new customer
export async function createCustomer(email: string, password: string, name: string) {
  // Check if customer already exists (use writeClient to bypass CDN cache)
  const existing = await writeClient.fetch(
    `*[_type == "customer" && email == $email][0]`,
    { email }
  );

  if (existing) {
    throw new Error('Email already registered');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create customer in Sanity
  const customer = await writeClient.create({
    _type: 'customer',
    email,
    name,
    passwordHash,
    createdAt: new Date().toISOString(),
  });

  return {
    id: customer._id,
    email: customer.email,
    name: customer.name,
  };
}

// Helper to get customer by ID
export async function getCustomerById(customerId: string) {
  const query = `*[_type == "customer" && _id == $customerId][0] {
    _id,
    email,
    name,
    savedAddresses,
    createdAt
  }`;

  return await client.fetch(query, { customerId });
}
