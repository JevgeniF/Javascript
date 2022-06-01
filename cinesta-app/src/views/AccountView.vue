<template>
  <div>
  <v-row class="text-center">
    <v-col cols="12">
    </v-col>
    <v-col class="mb-4">
      <h2 class="display-2 font-weight-bold mb-3">
        {{ t('Good day')}}, {{userName}} {{userSurname}}!
      </h2>
      <p>{{ t('Your account Id: ')}} {{userEmail}}</p>
      <v-spacer style="height: 15px"></v-spacer>
      <v-divider></v-divider>
      <v-spacer style="height: 15px"></v-spacer>
    </v-col>
  </v-row>
  </div>
  <div v-if="hasValidSubscription === true">
    <v-row class="text-center">
      <v-col cols="12">
      </v-col>
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          {{ t('You are subscribed to our service') }} {{ this.subscriptionName }}.
        </h2>
        <p>{{t('Your subscription valid till ')}} {{this.subscriptionValidity}}. {{ t('Enjoy!') }}</p>
        <v-spacer style="height: 15px"></v-spacer>
        <v-btn @click="unsubscribe()">Unsubscribe</v-btn>
        <v-spacer style="height: 15px"></v-spacer>
        <v-divider></v-divider>
        <v-spacer style="height: 15px"></v-spacer>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-row class="text-center">
      <v-col cols="12">
      </v-col>
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          {{ t('Currently you have no any valid subscriptions') }}.
        </h2>
        <p>{{t('You can renew it in ')}}  <router-link to="/subscribe">{{('subscriptions')}}</router-link></p>
        <v-spacer style="height: 15px"></v-spacer>
        <v-divider></v-divider>
        <v-spacer style="height: 15px"></v-spacer>
      </v-col>
    </v-row>
  </div>
  <div v-if="hasPaymentDetails === true">
    <v-row class="text-center">
      <v-col cols="12">
      </v-col>
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          {{ t('Your last subscription was purchased with card: ') }} {{ this.cardNumber }}
        </h2>
        <p>{{t('If you no longer need this payment method, you can remove it and add new during subscription update.')}}</p>
        <v-spacer style="height: 15px"></v-spacer>
        <v-btn @click="removeCard()">Remove card</v-btn>
        <v-spacer style="height: 15px"></v-spacer>
        <v-divider></v-divider>
        <v-spacer style="height: 15px"></v-spacer>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-row class="text-center">
      <v-col cols="12">
      </v-col>
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          {{ t('You don\'t have any saved payment methods') }}.
        </h2>
        <p>{{t('No need to add one till your subscription update.')}}</p>
        <v-spacer style="height: 15px"></v-spacer>
        <v-divider></v-divider>
        <v-spacer style="height: 15px"></v-spacer>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SubscriptionServices from '@/services/SubscriptionServices'
import moment from 'moment/moment'
import { useI18n } from 'vue-i18n'
import PaymentServices from '@/services/PaymentServices'
import UserServices from '@/services/UserServices'

export default defineComponent({
  name: 'AccountView',
  data () {
    const { t } = useI18n()
    return {
      t,
      userName: '',
      userSurname: '',
      userEmail: '',
      hasValidSubscription: false,
      subscriptionName: '' as string,
      subscriptionValidity: moment(),
      subscriptionId: '',
      hasPaymentDetails: false,
      paymentDetailsId: '',
      cardNumber: '',
    }
  },
  methods: {
    async removeCard() {
      await PaymentServices.DeletePaymentDetailsFromApi(this.paymentDetailsId)
      this.hasPaymentDetails = false
    },
    async unsubscribe() {
      await SubscriptionServices.DeleteUserSubscriptionFromApi(this.subscriptionId)
      this.hasValidSubscription = false
      localStorage.removeItem("user_subscription")
    },
    async getUserSubscription() {
      const subscription = await SubscriptionServices.GetUserSubscriptionFromApi()
      console.log(subscription)
      if (subscription.id) {
        if (Date.parse(subscription.expirationDateTime) > Date.now()) {
          this.hasValidSubscription = true
          this.subscriptionId = subscription.id
          this.subscriptionName = subscription.subscription.naming
          this.subscriptionValidity = moment.utc(subscription.expirationDateTime).local()
        }
      }
    },
    async getPaymentDetailsFromApi() {
      const paymentDetails = await PaymentServices.GetPaymentDetails()
      if (paymentDetails.id) {
        this.hasPaymentDetails = true
        const cardNumber = paymentDetails.cardNumber
        this.paymentDetailsId = paymentDetails.id
        this.cardNumber = cardNumber.slice(0, 4) + " **** **** ****"
      }
    },
    async getUserFromLocal() {
      const user = await UserServices.GetUser()
      this.userName = user.name
      this.userSurname = user.surname
      this.userEmail = user.email
    }
  },
  async beforeMount () {
    await this.getUserSubscription()
    await this.getPaymentDetailsFromApi()
    await this.getUserFromLocal()
  }
})
</script>

<style scoped>

</style>
