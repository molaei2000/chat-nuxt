import db from "~/utils/db";
import { loginSchema } from "~/utils/schema";

export default defineEventHandler(async (event) => {
    const { email, password } = await readValidatedBody(event, (body) =>
        loginSchema.parse(body)
    );

    const existingUser = await db.user.findUnique({
        where: {
            email,
        },
    });
    if (!existingUser) {
        console.log(existingUser);

        throw createError({
            statusCode: 400,
            statusMessage: "User not found",
        });
    }
    if (!existingUser.hashedPassword) {
        const connectedOAuthAccount = await db.oauthAccount.findFirst({
            where: {
                userId: existingUser.id,
            },
        });
        if (connectedOAuthAccount) {
            const oAuthProvider = connectedOAuthAccount.providerId;
            throw createError({
                statusCode: 400,
                statusMessage: `Account connected with ${oAuthProvider}. Please continue with ${oAuthProvider} to login`,
            });
        }
    }
    if (existingUser.hashedPassword) {
        const isPasswordCorrect = await verifyPassword(
            existingUser.hashedPassword,
            password
        );
        if (!isPasswordCorrect) {
            throw createError({
                statusCode: 400,
                statusMessage: "Invalid credentials",
            });
        }
    }

    const transformedUser = sanitizeUser(existingUser);

    await setUserSession(event, {
        user: transformedUser,
    });

    return transformedUser;
});
