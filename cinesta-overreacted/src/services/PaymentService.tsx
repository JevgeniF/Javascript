import AuthenticationService from "./identity/AuthenticationService";
import axios from "axios";
import {PaymentDetails} from "../models/PaymentDetails";
import {API_SERVICE_URL} from "../store/constants";

export default class PaymentService {

    static async GetPaymentDetails() {
        const refreshedTokens = await AuthenticationService.RefreshTokens()
        const axiosJwt = AuthenticationService.AxiosJwt(refreshedTokens.token)

        return await axios.get(API_SERVICE_URL + 'paymentdetails', axiosJwt)
            .then((response) => {
                console.log('API Get Payment Details status: '  + response.status)
                return response.data
            }).then(data => {
                return data as PaymentDetails
            })
    }

    static async PostPaymentDetails (cardType: string, cardNumber: string, validDate: string, securityCode: string) {
        const refreshedTokens = await AuthenticationService.RefreshTokens()
        const axiosJwt = AuthenticationService.AxiosJwt(refreshedTokens.token)

        return await axios.post(API_SERVICE_URL + 'paymentdetails', {
            cardType: cardType,
            cardNumber: cardNumber,
            validDate: validDate,
            securityCode: securityCode }, axiosJwt)
            .then((response) => {
                console.log('API Post Payment Details status: '  + response.status)
                return response.status
            })
    }

    static async DeletePaymentDetails (paymentDetailsId: string) {
        const refreshedTokens = await AuthenticationService.RefreshTokens()
        const axiosJwt = AuthenticationService.AxiosJwt(refreshedTokens.token)

        return await axios.delete(API_SERVICE_URL + 'paymentdetails/' + paymentDetailsId, axiosJwt)
            .then((response) => {
                console.log('API Delete Payment Details status: '  + response.status)
                return response.status
            })
    }
}
