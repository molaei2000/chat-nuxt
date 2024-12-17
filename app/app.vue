<template>
    <div>
        <ActiveStatus v-if="user?.id"></ActiveStatus>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <UNotifications />
    </div>
</template>

<script setup lang="ts">
const { user } = useUserSession();
</script>
