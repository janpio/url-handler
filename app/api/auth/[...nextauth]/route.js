import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prisma from "@/app/utils/prismaClient";

// const authOptions = {
//     session: {
//         strategy: "jwt",
//     },
// };
const handler = NextAuth({
    // authOptions,
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
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
