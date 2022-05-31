import UserServices from '@/services/UserServices'

import axios from 'axios'
import { PaymentDetails } from '@/models/PaymentDetails'

export default class PaymentServices {
  static async PostPaymentDetails (cardType: string, cardNumber: string, validDate: string, securityCode: string) {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    return await axios.post('paymentdetails', { cardType: cardType, cardNumber: cardNumber, validDate: validDate, securityCode: securityCode }, axiosJwt)
      .then((res) => {
        return res.status
      })
  }

  static async GetPaymentDetails() {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    return await axios.get('paymentdetails', axiosJwt)
      .then((res) => {
        return res.data as PaymentDetails
      }).then(data => {
        return data as PaymentDetails
      })
  }

  static async DeletePaymentDetailsFromApi (id: string) {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    return await axios.delete('paymentdetails/' + id, axiosJwt)
      .then((res) => {
        return res.status
      })
  }
}
