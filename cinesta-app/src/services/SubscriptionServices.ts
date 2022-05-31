import axios from 'axios'
import { UserSubscription } from '@/models/UserSubscription'
import UserServices from '@/services/UserServices'
import { Subscription } from '@/models/Subscription'

export default class SubscriptionServices {
    static async SaveUserSubscription(userSubscription: UserSubscription): Promise<void> {
        localStorage.setItem("user_subscription", JSON.stringify(userSubscription));
    }

  static async SaveSubscription(subscription: Subscription): Promise<void> {
    localStorage.setItem("subscription", JSON.stringify(subscription));
  }

    static GetUserSubscription(): UserSubscription {
        return JSON.parse(<string>localStorage.getItem("user_subscription")) as UserSubscription;
    }

  static GetSubscription(): Subscription {
    return JSON.parse(<string>localStorage.getItem("subscription")) as Subscription;
  }

    static async GetUserSubscriptionFromApi() {
      const tokenPromise = await UserServices.Tokens();
      const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
      const lang = UserServices.GetCulture()
        const response = await axios.get('usersubscriptions' + lang, axiosJwt)
            .then(res => {
                return res.data as UserSubscription;
            }).then(data => {
                return data as UserSubscription;
            })
            await this.SaveUserSubscription(response as UserSubscription);
            return response;
    }

  static async GetSubscriptions () {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    const lang = UserServices.GetCulture()
    console.log(lang)
    return await axios.get('subscriptions' + lang, axiosJwt)
      .then((res) => {
        return res.data as Subscription[];
      }).then(data => {
        return data as Subscription[];
      })
  }

  static async PostUserSubscription(subscription: Subscription) {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    const lang = UserServices.GetCulture()
    return await axios.post('usersubscriptions' + lang, subscription, axiosJwt)
      .then((res) => {
        return res.status
      })
  }

  static async DeleteUserSubscriptionFromApi (id: string) {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    return await axios.delete('usersubscriptions/' + id, axiosJwt)
      .then((res) => {
        return res.status
      })
  }
}
