import db from "~/utils/db";
import { registerSchema } from "~/utils/schema";

export default defineEventHandler(async (event) => {
    const { email, name, password } = await readValidatedBody(event, (body) =>
        registerSchema.parse(body)
    );

    const existingUser = await db.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser) {
        console.log(existingUser);

        throw createError({
            statusCode: 400,
            statusMessage: "User already exist",
        });
    }

    const hashedPassword = await hashPassword(password);
    const user = await db.user.create({
        data: {
            email,
            hashedPassword,
            name,
        },
    });

    const transformedUser = sanitizeUser(user);

    await setUserSession(event, {
        user: transformedUser,
    });

    return transformedUser;
});
