<template>
  <v-app>
    <v-app-bar style="display: flex; flex-direction: row;">
      <v-app-bar-title>Cinesta</v-app-bar-title>
      <div style="text-decoration: none; color: inherit; margin-left: 12px;">
        <v-icon>mdi-web</v-icon>
        <LocaleSwitch></LocaleSwitch>
      </div>
    </v-app-bar>
    <div class="ma-12 pa-12">
      <v-card>
        <v-navigation-drawer style="width: fit-content" permanent="true">
          <v-list style="flex-direction: column">
            <v-spacer style="height: 10px"></v-spacer>
            <router-link style="text-decoration: none; color: inherit; margin: 30px" to="/">
              {{t('Home')}}
            </router-link>
            <v-spacer style="height: 10px"></v-spacer>
            <v-divider></v-divider>
            <v-spacer style="height: 10px"></v-spacer>
            <div v-if="isGuest === true">
              <router-link style="text-decoration: none; color: inherit; margin: 30px" to="/login">
                <v-icon style="margin-bottom: 4px">mdi-login</v-icon> {{t('Sign In')}}
              </router-link>
            </div>
            <div v-else style="flex-direction: column">
              <div v-if="isUser === true" style="flex-direction: column">
                <router-link style="text-decoration: none; color: inherit; margin: 30px" to="/account">
                  {{t('Account')}}
                </router-link>
                  <v-spacer style="height: 20px"></v-spacer>
                  <router-link style="text-decoration: none; color: inherit; margin: 30px;" to="/profiles">
                    {{t('Profiles')}}
                  </router-link>
                  <v-spacer style="height: 20px"></v-spacer>
                  <router-link style="text-decoration: none; color: inherit; margin: 30px;" to="/subscribe">
                    {{t('Subscription')}}
                  </router-link>
              </div>
                <div v-if="isAdmin === true">
                  <router-link style="text-decoration: none; color: inherit; margin: 30px" to="/account">
                    {{t('Account')}}
                  </router-link>
                  <v-spacer style="height: 20px"></v-spacer>
                  <router-link style="text-decoration: none; color: inherit; margin: 30px;" to="/profiles">
                    {{t('Profiles')}}
                  </router-link>
                  <v-spacer style="height: 20px"></v-spacer>
                  <router-link style="text-decoration: none; color: inherit; margin: 30px;" to="/subscribe">
                    {{t('Subscription')}}
                  </router-link>
                  <v-spacer style="height: 20px"></v-spacer>
                  <router-link style="text-decoration: none; color: inherit; margin: 30px;" to="/admin">
                    {{t('Admin Panel')}}
                  </router-link>
                </div>
              <v-spacer style="height: 10px"></v-spacer>
              <v-divider></v-divider>
              <v-spacer style="height: 10px"></v-spacer>
                <v-spacer style="height: 10px"></v-spacer>
                <router-link style="text-decoration: none; color: inherit; margin: 30px;" to="/logout">
                  <v-icon style="margin-bottom: 4px">mdi-logout</v-icon> {{t('Sign Out')}}
                </router-link>
              </div>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </div>
    <v-main class="center">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LocaleSwitch from './components/i18n/LocaleSwitch.vue'
import UserServices from './services/UserServices'
import { useI18n } from 'vue-i18n'
import SubscriptionServices from '@/services/SubscriptionServices'
export default defineComponent({
  components: { LocaleSwitch },
  data() {
    const { t } = useI18n()
    return {
      t,
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
      if (localStorage.getItem("user_subscription") == null) {
        const subscription = await SubscriptionServices.GetUserSubscriptionFromApi()
        if (subscription.id) {
          await SubscriptionServices.SaveUserSubscription(subscription)
          console.log(localStorage.getItem("user_subscription"))
        }
      }

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
    }
  }
})
</script>
