import axios from "axios";
import AuthenticationService from "./identity/AuthenticationService";
import {Subscription} from "../models/Subscription";
import {UserSubscription} from "../models/UserSubscription";
import Culture from "./Culture";
import {API_SERVICE_URL} from "../store/constants";

export default class SubscriptionService {

    static async GetSubscriptions() {
        const refreshedTokens = await AuthenticationService.RefreshTokens()
        const axiosJwt = AuthenticationService.AxiosJwt(refreshedTokens.token)
        const culture = Culture.GetCulture()

        return await axios.get(API_SERVICE_URL + 'subscriptions' + culture, axiosJwt)
            .then((response) => {
                console.log('API Get Subscriptions status: ' + response.status)
                return response.data
            }).then(data => {
                return data as Subscription[];
            })
    }

    static async GetUserSubscription() {
        const refreshedTokens = await AuthenticationService.RefreshTokens()
        const axiosJwt = AuthenticationService.AxiosJwt(refreshedTokens.token)
        const culture = Culture.GetCulture()

        return await axios.get(API_SERVICE_URL + 'usersubscriptions' + culture, axiosJwt)
            .then((response) => {
                console.log('API Get User Subscription status: ' + response.status)
                return response.data
            }).then(data => {
                return data as UserSubscription;
            })
    }

    static async PostUserSubscription(subscription: Subscription) {
        const refreshedTokens = await AuthenticationService.RefreshTokens()
        const axiosJwt = AuthenticationService.AxiosJwt(refreshedTokens.token)
        const culture = Culture.GetCulture()

        return await axios.post(API_SERVICE_URL + 'usersubscriptions' + culture, subscription, axiosJwt)
            .then((res) => {
                return res.status
            })
    }

    static async DeleteUserSubscription(subscriptionId: string) {
        const refreshedTokens = await AuthenticationService.RefreshTokens()
        const axiosJwt = AuthenticationService.AxiosJwt(refreshedTokens.token)

        return await axios.delete(API_SERVICE_URL + 'usersubscriptions/' + subscriptionId, axiosJwt)
            .then((response) => {
                console.log('API Get User Subscription status: ' + response.status)
                return response.status
            })
    }
}
