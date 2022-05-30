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
                {{t('Sign Up')}}
              </h2>
              <form action="#" @submit.prevent="signUp">
                <div class="form-control">
                  <div class="error"><span v-if="firstNameError" class="errorMessage">{{nameErrorMessage}}</span></div>
                  <input type="text" name="firstName" id="firstName" class="login-input" v-model="firstName"
                         placeholder="First Name" v-on:change="isFirstNameValid">
                </div>
                <div class="form-control">
                  <div class="error"><span v-if="lastNameError" class="errorMessage">{{nameErrorMessage}}</span></div>
                  <input type="text" name="lastName" id="lastName" class="login-input" v-model="lastName"
                         placeholder="Last Name" v-on:change="isLastNameValid">
                </div>
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
                  <button type="submit" class="btn-submit">Sign Up</button>
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
import { defineComponent } from "vue"
import UserServices from '@/services/UserServices'
import router from '@/router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RegisterView',
  data () {
    const { t } = useI18n()
    return {
      t,
      firstName: '',
      firstNameError: false,
      lastName: '',
      lastNameError: false,
      nameErrorMessage: t('The field should contain at least one character'),
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
    isFirstNameValid () {
      this.firstNameError = this.firstName.trim() === ''
    },
    isLastNameValid () {
      this.lastNameError = this.lastName.trim() === ''
    },
    isEmailValid () {
      this.emailError = !this.emailPattern.test(this.email)
    },
    isPasswordValid () {
      this.passwordError = this.password.length < 6
    },
    signUp () {
      if (!this.emailError && !this.passwordError && !this.firstNameError && !this.lastNameError) {
        UserServices.Register(this.firstName, this.lastName, this.email, this.password)
        if (localStorage.getItem("user") != null) {
          router.push('/')
        }
      }
    }
  }
})
</script>

<style scoped>

</style>
