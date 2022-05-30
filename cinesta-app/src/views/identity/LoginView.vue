<template>
<div>
    <v-app>
    <v-main>
        <v-container>
    <v-row class="text-center">
      <v-col cols="12">
      </v-col>

      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          {{t('Sign In')}}
        </h2>
        <form action="#" @submit.prevent="signIn">
        <div class="form-control">
        <div class="error"><span v-if="emailError" class="errorMessage">{{emailErrorMessage}}</span></div>
        <input type="email" name="email" id="email" class="login-input" v-model="email" placeholder="Email"
               v-on:change="isEmailValid">
      </div>

      <div class="form-control mb-more">
        <div class="error"><span v-if="passwordError" class="errorMessage">{{passwordErrorMessage}}</span></div>
        <input type="password" name="password" id="password" class="login-input" v-model="password"
               placeholder="Password" v-on:change="isPasswordValid">
      </div>

      <div class="form-control">
        <div class="error" v-if="signInError">
          <span v-if="signInError" class="errorMessage">{{signInErrorMessage}}</span>
        </div>
        <button type="submit" class="btn-submit">Sign In</button>
      </div>
        </form>
      </v-col>
    </v-row>
  </v-container>
    </v-main>
    </v-app>
</div>
</template>

<script lang="ts">
import SubscriptionServices from "@/services/SubscriptionServices";
import UserServices from "@/services/UserServices";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import router from '@/router'

export default defineComponent({
    name: "LoginView",
    components: {},
    data() {
        const { t } = useI18n()
        return {
            t,
            email: '',
            password: '',
            emailPattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/,
            emailError: false,
            emailErrorMessage: t('The email has invalid email pattern'),
            passwordError: false,
            passwordErrorMessage: t('The password must be min 6 characters long'),
            signInError: false,
            signInErrorMessage: t('Please check credentials and try again')
        }
    },
    methods: {
    isEmailValid () {
      this.emailError = !this.emailPattern.test(this.email)
    },
    isPasswordValid () {
      this.passwordError = this.password.length < 6
    },
    signIn () {
      if (!this.emailError && !this.passwordError) {
        UserServices.Login(this.email, this.password)
        SubscriptionServices.GetUserSubscriptionFromApi()
        if (localStorage.getItem("user") != null) {
          router.push('/')
        }
      }
    }
  }
})
</script>
