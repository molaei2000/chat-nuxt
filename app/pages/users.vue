<script lang="ts" setup>
definePageMeta({
    middleware: "protected",
});
const { user, clear } = useUserSession();

const logout = async () => {
    await clear();
    navigateTo("/");
};
</script>

<template>
    <div>
        {{ user }}
    </div>
    <UButton @click="logout">logout</UButton>
</template>
