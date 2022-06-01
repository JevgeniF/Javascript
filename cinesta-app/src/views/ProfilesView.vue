<template>
  <div v-if="hasValidSubscription === false">
    <v-row class="text-center">
      <v-col cols="12">
      </v-col>
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          {{t ('You don\'t have subscription or it is expired.') }}
        </h2>
        <p>{{ t('Please proceed to') }}<router-link to="/subscribe">{{t('subscriptions')}}</router-link> and subscribe.</p>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-row class="text-center">
      <v-col cols="12">
      </v-col>
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          {{ ('Please choose profile or add new.') }}
        </h2>
      </v-col>
    </v-row>
    <v-row>
    <v-card
      class="mx-auto"
      min-width="200"
      max-width="300"
      v-for="(profile) in this.profiles" :key="profile.id" v-bind:value="profile.id"
    >
      <v-img @click="goToProfileMovies(profile)"
        :src="profile.iconUri"
        height="150px"
      ></v-img>

      <v-card-title @click="goToProfileMovies(profile)">
        {{profile.name}}
      </v-card-title>
      <v-card-actions>
        <v-btn @click="deleteProfile(profile.id)">
          Remove Me
        </v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    </v-row>
  </div>
  <div v-if="(this.profilesCountInSubscription - this.profiles.length) > 0">
    <v-row class="text-center">
    <v-col cols="12" v-if="addMode === false">
    </v-col>
    <v-col class="mb-4" v-if="addMode === false">
          <v-btn @click="this.addMode = true">Add Profile</v-btn>
    </v-col>
      <v-card v-if="addMode === true" elevation="2" class="mx-auto"
              max-width="344"
              min-width="300"
              outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">{{t('Add new profile')}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <form action="#" @submit.prevent="addProfile">
          <div class="form-control">
            <div class="error"><span v-if="uriError" class="errorMessage">{{errorMessage}}</span></div>
            <input id="uri" v-model="imageUri" class="profile-input" name="image-uri" placeholder="Profile pic Url"
                   type="url" v-on:change="isUriValid">
          </div>
          <v-divider></v-divider>
          <div class="form-control mb-more">
            <div class="error"><span v-if="nameError" class="errorMessage">{{errorMessage}}</span></div>
            <input type="text" name="name" id="nae" class="profile-input" v-model="profileName"
                   placeholder="Profile name" v-on:change="isNameIsValid">
          </div>
          <v-divider></v-divider>
          <div class="form-control mb-more">
            <div class="error"><span v-if="ageError" class="errorMessage">{{ageErrorMessage}}</span></div>
            <input type="number" name="age" id="age" class="profile-input" v-model="age"
                   placeholder="age" v-on:change="isAgeValid">
          </div>
        </form>
        <v-card-actions>
          <v-btn @click="addProfile()">Add</v-btn>
          <v-btn @click="addMode = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
  </v-row></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import SubscriptionServices from '@/services/SubscriptionServices'
import ProfileServices from '@/services/ProfileServices'
import UserProfile from '@/models/UserProfile'
import router from '@/router'

export default defineComponent({
  name: 'ProfilesView',
  data () {
    const { t } = useI18n()
    return {
      t,
      hasValidSubscription: false,
      profilesCountInSubscription: 0 as number,
      profiles: [] as UserProfile[],
      addMode: false,
      uriError: false,
      errorMessage: t('The field can\'t be empty'),
      imageUri: '',
      nameError: false,
      profileName: '',
      ageError: false,
      ageErrorMessage: t('Age can\'t be null'),
      age: 0
    }
  },
  methods: {
    goToProfileMovies(profile: UserProfile) {
      ProfileServices.SaveProfile(profile)
      router.push('/movies')
    },
    async deleteProfile (id: string) {
      const res = await ProfileServices.deleteProfile(id)
      console.log(res)
      await this.getUserProfiles()
    },
    isUriValid() {
      if (this.imageUri.length < 1) {
        this.uriError = true
      }
    },
    isNameIsValid() {
      if (this.profileName.length < 1) {
        this.nameError = true
      }
    },
    isAgeValid() {
      if (this.age == null) {
        this.ageError = true
      }
    },
    async addProfile() {
      if (!this.uriError && !this.nameError && !this.ageError) {
        const res = await ProfileServices.PostUserProfile(this.imageUri, this.profileName, this.age)
        console.log(res)
        this.addMode = false
        await this.getUserProfiles()
      }
    },
    async getUserSubscription () {
      const subscription = await SubscriptionServices.GetUserSubscriptionFromApi()
      console.log(subscription)
      if (subscription.id) {
        if (Date.parse(subscription.expirationDateTime) > Date.now()) {
          this.hasValidSubscription = true
          this.profilesCountInSubscription = subscription.subscription.profilesCount
        }
      }
    },
    async getUserProfiles () {
      this.profiles = await ProfileServices.GetUserProfiles()
      console.log(this.profiles)
    }
  },
  async mounted () {
    await this.getUserSubscription()
    await this.getUserProfiles()
  }
})
</script>
