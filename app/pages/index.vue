<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
const items = [
    {
        slot: "login",
        label: "Login",
        description: "Login to your account",
    },
    {
        slot: "register",
        label: "Register",
        description: "Register",
    },
];

const loginForm = reactive({
    email: "mahdi.molaei0002@gmail.com",
    password: "@M123456789",
});
const registerForm = reactive({
    name: "triplem",
    email: "mahdi.molaei0002@gmail.com",
    password: "@M123456789",
});
const isLoading = ref(false);
const selectedItem = ref(0);
const { fetch: refreshSession } = useUserSession();

const login = async (event: FormSubmitEvent<LoginSchema>) => {
    try {
        const user = await $fetch("/api/auth/login", {
            body: event.data,
            method: "post",
        });
        console.log(user);
        await refreshSession();
        await navigateTo("/users");
    } catch (error) {
        console.log(error);
    }
};
const register = async (event: FormSubmitEvent<RegisterSchema>) => {
    try {
        const user = await $fetch("/api/auth/register", {
            body: event.data,
            method: "post",
        });
        console.log(user);

        selectedItem.value = 0;
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <UTabs
        v-model="selectedItem"
        :items="items"
        class="w-full max-w-md mx-auto"
    >
        <template #login="{ item }">
            <UCard>
                <template #header>
                    <p
                        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                    >
                        {{ item.label }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {{ item.description }}
                    </p>
                </template>

                <UForm
                    :schema="loginSchema"
                    :state="loginForm"
                    class="space-y-4"
                    @submit="login"
                >
                    <UFormGroup label="Email" name="email" class="mb-3">
                        <UInput type="email" v-model="loginForm.email" />
                    </UFormGroup>
                    <UFormGroup label="Password" name="password">
                        <UInput type="password" v-model="loginForm.password" />
                    </UFormGroup>
                    <div class="space-y-5 mt-5">
                        <UButton type="submit" block :disabled="isLoading"
                            >Login</UButton
                        >
                        <div
                            class="flex align-middle text-center w-full border-solid"
                        >
                            <div
                                class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid"
                            ></div>
                            <div
                                class="font-medium relative -top-2 text-gray-700 dark:text-gray-200 flex mx-3 whitespace-nowrap"
                            >
                                <span class="text-sm">or</span>
                            </div>
                            <div
                                class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid"
                            ></div>
                        </div>
                        <a href="/api/auth/github">
                            <UButton
                                icon="i-lucide-github"
                                block
                                color="gray"
                                sugar
                                :disabled="isLoading"
                                >Continue with github</UButton
                            >
                        </a>
                    </div>
                </UForm>
            </UCard>
        </template>

        <template #register="{ item }">
            <UCard>
                <template #header>
                    <h3
                        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                    >
                        {{ item.label }}
                    </h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {{ item.description }}
                    </p>
                </template>
                <UForm
                    :schema="registerSchema"
                    :state="registerForm"
                    class="space-y-4"
                    @submit="register"
                >
                    <UFormGroup label="name" name="name">
                        <UInput v-model="registerForm.name" />
                    </UFormGroup>
                    <UFormGroup label="Email" name="email">
                        <UInput type="email" v-model="registerForm.email" />
                    </UFormGroup>
                    <UFormGroup label="Password" name="password">
                        <UInput
                            type="password"
                            v-model="registerForm.password"
                        />
                    </UFormGroup>
                    <div class="space-y-5 mt-5">
                        <UButton type="submit" block :disabled="isLoading"
                            >Register</UButton
                        >
                        <div
                            class="flex align-middle text-center w-full border-solid"
                        >
                            <div
                                class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid"
                            ></div>
                            <div
                                class="font-medium relative -top-2 text-gray-700 dark:text-gray-200 flex mx-3 whitespace-nowrap"
                            >
                                <span class="text-sm">or</span>
                            </div>
                            <div
                                class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid"
                            ></div>
                        </div>
                        <a href="/api/auth/github">
                            <UButton
                                icon="i-lucide-github"
                                block
                                color="gray"
                                sugar
                                :disabled="isLoading"
                                >Continue with github</UButton
                            >
                        </a>
                    </div>
                </UForm>
            </UCard>
        </template>
    </UTabs>
</template>
