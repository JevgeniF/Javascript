<template>
  <SubscribedRouting />
  <router-link style="text-decoration: none; color: inherit; margin: 6px;" to="/user-profiles">
    <v-icon>mdi-admin_panel_settings</v-icon>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SubscribedRouting from "./SubscribedRouting.vue";
export default defineComponent({
  components: { SubscribedRouting },
  name: "AdminRoutes",
  data() {
    return {
    }
  }
})
</script>

<style scoped>
</style>
