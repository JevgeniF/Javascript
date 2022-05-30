<template>
  <v-app>
    <v-app-bar style="display: flex; flex-direction: row;">
      <v-app-bar-title>Cinesta</v-app-bar-title>
      <nav style="display: flex; flex-direction: row;">
        <div v-if="isGuest === true">
          <router-link style="text-decoration: none; color: inherit; margin: 6px;" to="/">
            <v-icon>mdi-home</v-icon>
          </router-link>
          <router-link style="text-decoration: none; color: inherit; margin: 6px;" to="/login">
            <v-icon>mdi-login</v-icon>
          </router-link>
        </div>
        <div v-else>
          <div v-if="isUser === true">
            <SubscribedRouting v-if="isSubscribed === true"></SubscribedRouting>
            <UnsubscribedRouting v-if="isSubscribed === false"></UnsubscribedRouting>
          </div>
          <AdminRouting v-if="isAdmin === true"></AdminRouting>
          <router-link style="text-decoration: none; color: inherit; margin: 6px;" to="/logout">
            <v-icon>mdi-logout</v-icon>
          </router-link>
        </div>
        <div style="text-decoration: none; color: inherit; margin-left: 12px;">
          <v-icon>mdi-web</v-icon>
          <LocaleSwitch></LocaleSwitch>
        </div>
      </nav>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SubscribedRouting from './components/headers/SubscribedRouting.vue'
import UnsubscribedRouting from './components/headers/UnsubscribedRouting.vue'
import AdminRouting from './components/headers/AdminRouting.vue'
import LocaleSwitch from './components/i18n/LocaleSwitch.vue'
import UserServices from './services/UserServices'
import SubscriptionServices from './services/SubscriptionServices'

export default defineComponent({
  components: { SubscribedRouting, UnsubscribedRouting, AdminRouting, LocaleSwitch },
  data() {
    return {
      isGuest: true as boolean,
      isUser: true as boolean,
      isSubscribed: true as boolean,
      isAdmin: true as boolean
    }
  },
  methods: {

    async checkUser() {
      return UserServices.GetUser()
    },
    async checkUserSubscription() {
      return SubscriptionServices.GetUserSubscription()
    },
    checkLanguage() {
      if (!localStorage.getItem("lang")) {
        localStorage.setItem("lang", "en-GB")
      }
      this.$i18n.locale = localStorage.getItem("lang") || "en-GB"
    }
  },
  watch: {
    $route: async function() {
      this.checkLanguage()
      const user = await this.checkUser()
      if (localStorage.getItem("user") == null) {
        this.isGuest = true;
        return
      }
      const subscription = await this.checkUserSubscription()
      if (user.roles.includes("admin")) {
        this.isGuest = false;
        this.isUser = false;
        this.isAdmin = true;
      } else if (user.roles.includes("user")) {
        this.isGuest = false;
        this.isUser = true;
        this.isAdmin = false;
      } else {
        this.isGuest = true;
        this.isUser = false;
        this.isAdmin = false;
      }
      if (this.isUser) {
        this.isSubscribed = !!subscription;
      }
    }
  }
})
</script>
