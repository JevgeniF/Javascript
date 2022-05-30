<script lang="ts">
import { defineComponent } from 'vue'
import router from '@/router'

export default defineComponent({
  name: 'LogoutComponent',
  async beforeMount() {
    localStorage.removeItem("user");
    localStorage.removeItem("user_subscription");
    await router.push('/')
  }
});
</script>

<style scoped>

</style>
