<template>
  <div v-if="hasValidSubscription === false">
  <v-row class="text-center">
    <v-col cols="12">
    </v-col>
    <v-col class="mb-4">
      <h2 class="display-2 font-weight-bold mb-3">
        {{ ('Please choose subscription') }}
      </h2>
      <p>{{ t('The payment api is not connected, so the app simulates buying of subscription.') }}</p>
    </v-col>
  </v-row>
  <v-row>
    <v-card elevation="2" class="mx-auto"
            max-width="344"
            min-width="300"
            outlined v-for="(subscription) in this.subscriptions" :key="subscription.id"
            v-bind:value="subscription.id">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">{{ subscription.naming }}</v-list-item-title>
          <v-list-item-subtitle>{{ subscription.description }}</v-list-item-subtitle>
          <v-card-text><p>{{ subscription.profilesCount }} {{ t('profiles') }}</p>
            <p>{{ subscription.price }} EUR</p>
          </v-card-text>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-btn @click="saveSubscription(subscription)"
               outlined
               rounded
               text
        >Select
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
  <div v-if="this.subscriptionName.length > 0">
  <v-row class="text-center">
    <v-col cols="12">
    </v-col>
    <v-col class="mb-4">
      <p>{{ t('Thank you for choosing') }} {{ this.subscriptionName }}.</p>
      <p>{{ t('Please fill your card details below and confirm payment or') }} <a
        style="color: red; text-decoration-line: underline" @click="cancelProcess">{{ t('cancel') }}</a>.</p>
      </v-col>
    </v-row>
    <v-card elevation="2" class="mx-auto"
            width="400"
            outlined>
      <v-col class="mx-auto">
        <form action="#" @submit.prevent="confirmSubscription">
          <div class="form-control">
            <div class="error"><span v-if="cardNumberError" class="errorMessage">{{cardNumberErrorMessage}}</span></div>
            <input id="card-number" v-model="cardNumber" class="payment-input" name="card-number" placeholder="Card Number"
                   type="text"
                   v-on:change="isCardNumberValid">
          </div>
          <v-divider></v-divider>
          <div class="form-control mb-more">
            <div class="error"><span v-if="dateError" class="errorMessage">{{dateErrorMessage}}</span></div>
            <input type="text" name="date" id="date" class="payment-input" v-model="date"
                   placeholder="Valid till (MM/YYYY)" v-on:change="isDateValid">
          </div>
          <v-divider></v-divider>
          <div class="form-control mb-more">
            <div class="error"><span v-if="cvcError" class="errorMessage">{{cvcErrorMessage}}</span></div>
            <input type="text" name="cvc" id="cvc" class="payment-input" v-model="cvc"
                   placeholder="cvv/cvc" v-on:change="isCvcValid">
          </div>
          <div class="form-control">
            <div class="error" v-if="cardError">
              <span v-if="cardError" class="errorMessage">{{cardErrorMessage}}</span>
            </div>
            <v-card-actions>
            <v-btn type="submit"
                   text
            >Confirm
            </v-btn>
            </v-card-actions>
          </div>
        </form>
      </v-col>
    </v-card>
  </div>
  </div>
  <div v-else>
    <v-row class="text-center">
      <v-col cols="12">
      </v-col>
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          {{ t('You are subscribed to our service') }} {{ this.subscriptionName }}.
        </h2>
        <p>{{t('Your subscription valid till ')}} {{this.subscriptionValidity}}. {{ t('Enjoy!') }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Subscription } from '@/models/Subscription'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import SubscriptionServices from '@/services/SubscriptionServices'
import router from '@/router'
import PaymentServices from '@/services/PaymentServices'
import moment from 'moment'

export default defineComponent({
  name: 'SubscriptionsComponent',
  data () {
    const { t } = useI18n()
    return {
      t,
      hasValidSubscription: false,
      subscriptions: [] as Subscription[],
      subscriptionName: '' as string,
      subscriptionValidity: moment(),
      // subscriptionPrice: 0 as number

      cardName: '' as string,
      cardNumber: '' as string,
      date: '' as string,
      dateUtc: '' as string,
      cvc: '' as string,
      unsupportedCardError: t('Your credit card is not supported'),
      numberCardError: t('Your card number must be 16 characters long'),
      cardNumberErrorMessage: '',
      cardNumberError: false,
      dateErrorMessage: t('Please check date'),
      dateRegex: /^((0[1-9])|(1[0-2]))\/((2022)|(20[2-3]\d))$/,
      dateError: false,
      cvcRegex: /^\d{3}$/,
      cvcErrorMessage: t('the security code is 3 digit code on back of your card'),
      cvcError: false,
      cardErrorMessage: t('Please check your card details'),
      cardError: false
    }
  },
  methods: {
    async getSubscriptions () {
      this.subscriptions = await SubscriptionServices.GetSubscriptions()
    },
    saveSubscription (value: Subscription) {
      SubscriptionServices.SaveSubscription(value)
      this.subscriptionName = value.naming
    },
    cancelProcess () {
      router.push('/')
    },
    isCardNumberValid() {
      this.cardNumberError = false
      if (this.cardNumber.startsWith('5') || this.cardNumber.startsWith('2')) {
        this.cardName = 'Mastercard'
      } else if (this.cardNumber.startsWith('4')) {
        this.cardName = 'Visa'
      } else if (this.cardNumber.startsWith('3')) {
        this.cardName = 'AmericanExpress'
      } else {
        this.cardNumberErrorMessage = this.unsupportedCardError
        this.cardNumberError = true
        return
      }
      if (this.cardNumber.length !== 16) {
        this.cardNumberErrorMessage = this.numberCardError
        this.cardNumberError = true
      }
    },
    isDateValid() {
      this.dateError = false
      this.dateError = !this.dateRegex.test(this.date)
      const date = new Date(Number(this.date.slice(3)), Number(this.date.slice(0, 2)))
      if (date <= new Date(Date.now())) {
        this.dateError = true
      } else {
        this.dateUtc = date.toISOString()
        console.log(this.dateUtc)
      }
    },
    isCvcValid() {
      this.cvcError = !this.cvcRegex.test(this.cvc)
    },
    async confirmSubscription() {
      const subscription = SubscriptionServices.GetSubscription()
      console.log(subscription)
      if (!this.cardNumberError && !this.dateError && !this.cvcError && this.cardNumber !== '' && this.date !== '' && this.cvc !== '') {
        const res = await PaymentServices.PostPaymentDetails(
          this.cardName,
          this.cardNumber,
          this.dateUtc,
          this.cvc)
        if (res === 201) {
            const resSub = await SubscriptionServices.PostUserSubscription(subscription)
            if (resSub === 201) {
            await router.push('/')
            }
          }
      } else this.cardError = true;
    }
  },
  async beforeMount () {
    const subscription = await SubscriptionServices.GetUserSubscriptionFromApi()
    if (subscription.id) {
      if (Date.parse(subscription.expirationDateTime) > Date.now()) {
        this.hasValidSubscription = true
        this.subscriptionName = subscription.subscription.naming
        this.subscriptionValidity = moment.utc(subscription.expirationDateTime).local()
      }
    }
  },
  async mounted () {
    await this.getSubscriptions()
  }
})
</script>
