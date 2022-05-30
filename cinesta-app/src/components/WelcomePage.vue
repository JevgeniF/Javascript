<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          {{('Welcome to Cinesta')}}
        </h1>

        <p class="subheading font-weight-regular">
          {{('The project meant to collect estonian movies as precious part of Estonian culture.')}}
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-5">
          What you gonna do now?
        </h2>

        <div v-if="user === null">
          <p class="subheading font-weight-regular">
            {{('If you are already registered, then ')}}
            <router-link to="/login">{{('sign in')}}</router-link>.
          </p>
          <p class="subheading font-weight-regular">
            {{('If not, feel free to ')}}
            <router-link to="/register">{{('create')}}</router-link>
            {{('new account and enjoy watching masterpieces of estonian film industry.')}}
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'WelcomePage',

  data () {
    const user = localStorage.getItem("user")
    const { t } = useI18n()
    return {
      t,
      user
    }
  }
})
</script>
