<template>
    <router-link style="text-decoration: none; color: inherit; margin: 6px;" to="/">
        <v-icon>mdi-home</v-icon>
    </router-link>
    <router-link style="text-decoration: none; color: inherit; margin: 6px;" to="/account-settings">
        <v-icon>mdi-manage_accounts</v-icon>
    </router-link>
    <router-link style="text-decoration: none; color: inherit; margin: 6px;" to="/user-profiles">
        <v-icon>mdi-face</v-icon>
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "SubscribedRoutes",
    data() {
        return {
        }
    }
})
</script>

<style scoped>
</style>
