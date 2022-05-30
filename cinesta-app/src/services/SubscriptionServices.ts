import axios from "axios";
import { UserSubscription } from '@/models/UserSubscription'
import UserServices from '@/services/UserServices'

export default class SubscriptionServices {
    static async SaveUserSubscription(userSubscription: UserSubscription): Promise<void> {
        localStorage.setItem("user_subscription", JSON.stringify(userSubscription));
    }

    static GetUserSubscription(): UserSubscription {
        return JSON.parse(<string>localStorage.getItem("user_subscription")) as UserSubscription;
    }

    static async GetUserSubscriptionFromApi() {
      const tokenPromise = await UserServices.Tokens();
      const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
        const response = await axios.get('usersubscriptions', axiosJwt)
            .then(res => {
                return res.data as UserSubscription;
            }).then(data => {
                return data as UserSubscription;
            })
            await this.SaveUserSubscription(response as UserSubscription);
            return response;
    }
}
