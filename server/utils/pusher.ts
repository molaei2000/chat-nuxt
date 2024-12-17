import PusherServer from "pusher";
export const pusherServer = new PusherServer({
    appId: useRuntimeConfig().pusherAppId,
    key: useRuntimeConfig().public.pusherAppKey,
    secret: useRuntimeConfig().pusherSecret,
    cluster: "us2",
    useTLS: true,
});
