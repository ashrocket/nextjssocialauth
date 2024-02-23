import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { getDb } from '../../../lib/mongodb';

const nextAuthDbName = process.env.NEXT_AUTH_DBNAME!;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return NextAuth(req, res, {
        providers: [
            EmailProvider({
                server: process.env.EMAIL_SERVER,
                from: process.env.EMAIL_FROM
            }),
        ],
        adapter: MongoDBAdapter({
            db: await getDb(nextAuthDbName)
        }),
        session: {
            jwt: true,
        },
        pages: {
            signIn: '/auth/signin',
        }
    })
}