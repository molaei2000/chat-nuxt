<template>
    <Layout>
        <UsersList
            :pending="status === 'pending' ? true : false"
            :items="users"
        ></UsersList>

        <div class="lg:pl-80 h-[100dvh] lg:block">
            <slot></slot>
        </div>
    </Layout>
</template>

<script setup lang="ts">
const { data: users, status } = await useLazyFetch("/api/users", {
    key: "chat-users",
    server: false,
    transform: (allUsers) =>
        allUsers.map((user) => {
            return {
                ...user,
                createdAt: new Date(user.createdAt),
                updatedAt: new Date(user.updatedAt),
            };
        }),
});
</script>
