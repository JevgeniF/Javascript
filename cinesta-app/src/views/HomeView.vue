<template>
  <WelcomePage/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WelcomePage from '@/components/WelcomePage.vue'

export default defineComponent({
  name: 'HomeView',
  components: { WelcomePage }
})
</script>
