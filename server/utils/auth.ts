import type { User } from "@prisma/client";

export const sanitizeUser = (user: User) => {
    // @ts-ignore
    delete user.hashedPassword;
    return user;
};
