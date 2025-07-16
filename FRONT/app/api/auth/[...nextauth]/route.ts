import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("Authorize called with:", credentials); // Debugging
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                if (!apiUrl || !credentials) {
                    console.error("API URL or credentials missing");
                    return null;
                }

                try {
                    const res = await fetch(`${apiUrl}/login`, {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    });

                    console.log("API response status:", res.status); // Debugging
                    if (!res.ok) {
                        console.log(`Login failed with status: ${res.status}`);
                        return null;
                    }

                    const user = await res.json();
                    console.log("User from API:", user); // Debugging
                    return user && user.id ? user : null;
                } catch (e) {
                    console.error("Authorize request failed:", e);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as number;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };