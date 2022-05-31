import UserServices from '@/services/UserServices'

import axios from 'axios'

export default class PaymentServices {
  static async PostPaymentDetails (cardType: string, cardNumber: string, validDate: string, securityCode: string) {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    return await axios.post('paymentdetails', { cardType: cardType, cardNumber: cardNumber, validDate: validDate, securityCode: securityCode }, axiosJwt)
      .then((res) => {
        return res.status
      })
  }
}
