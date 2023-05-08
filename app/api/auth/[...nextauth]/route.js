import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prisma from "@/app/utils/prismaClient";

const authOptions = {
    session: {
        strategy: "jwt",
    },
};
const handler = NextAuth({
    authOptions,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Your username",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = prisma.user.findUnique({
                    where: { email: credentials.username },
                });
                if (user) {
                    const isMatch = compare(
                        credentials.password,
                        user.password
                    );
                    if (isMatch) {
                        return user;
                    }
                } else {
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    adapter: PrismaAdapter(prisma),
});

export { handler as GET, handler as POST };
