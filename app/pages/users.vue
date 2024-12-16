<script lang="ts" setup>
definePageMeta({
    middleware: "protected",
    layout: "users",
});
</script>

<template>
    <Empty label="select a chat to start a new conversation" />
</template>
