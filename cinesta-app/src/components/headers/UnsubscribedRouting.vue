<template>
  <router-link style="text-decoration: none; color: inherit; margin: 6px;" to="/"><v-icon>mdi-home</v-icon>
  </router-link>
  <router-link style="text-decoration: none; margin: 6px;" to="/subscribe"><v-icon>mdi-add_circle_outline</v-icon>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "UnsubscribedRoutes",
  data() {
    return {
    }
  }
})
</script>

<style scoped>
</style>
