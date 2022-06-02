import {PaymentDetails} from "../models/PaymentDetails";
import {PAYMENT_DELETE, PAYMENT_FAIL, PAYMENT_REQUEST, PAYMENT_SUCCESS} from "../store/constants";

export interface PaymentDetailsState {
    loading?: boolean
    error?: string
    payment: PaymentDetails
}

interface Action {
    type: string
    payload?: string
}

// @ts-ignore
export const paymentDetailsReducer = (state: PaymentDetailsState = {payment: {}}
    , action: Action) => {
    switch (action.type) {
        case PAYMENT_REQUEST:
            return {loading: true}
        case PAYMENT_SUCCESS:
            return {loading: false, payment: action.payload}
        case PAYMENT_FAIL:
            return {loading: false, error: action.payload}
        case PAYMENT_DELETE:
            return {payment: action.payload}
        default:
            return state
    }
}
