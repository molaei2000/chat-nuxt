import db from "~/utils/db";

export default defineOAuthGitHubEventHandler({
    config: {
        emailRequired: true,
    },
    async onSuccess(event, { user }) {
        let currentUser = await db.user.findUnique({
            where: {
                email: user.email,
            },
        });
        if (!currentUser) {
            currentUser = await db.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    avatarUrl: user.avatar_url,
                },
            });
        }
        const oauthAccount = await db.oauthAccount.findFirst({
            where: {
                userId: currentUser.id,
            },
        });
        if (!oauthAccount) {
            await db.oauthAccount.create({
                data: {
                    userId: currentUser.id,
                    providerId: "github",
                    providerUserId: user.id + "",
                },
            });
        }
        const transformedUser = sanitizeUser(currentUser);

        await setUserSession(event, {
            user: transformedUser,
        });
        return sendRedirect(event, "/");
        // await setUserSession(event, {
        //     user: {
        //         githubId: user.id,
        //     },
        // });
        // return sendRedirect(event, "/");
    },
    // Optional, will return a json error and 401 status code by default
    onError(event, error) {
        console.error("GitHub OAuth error:", error);
        return sendRedirect(event, "/");
    },
});
