import {
    SUBSCRIPTION_DELETE,
    SUBSCRIPTION_FAIL,
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_SUCCESS
} from "../store/constants";
import {Subscription} from "../models/Subscription";

export interface SubscriptionState {
    loading?: boolean
    error?: string
    subscriptions: Subscription[]
}

interface Action {
    type: string
    payload?: string
}

// @ts-ignore
export const subscriptionReducer = (state: SubscriptionState = { subscriptions: {}}
    , action: Action) => {
    switch (action.type) {
        case SUBSCRIPTION_REQUEST:
            return { loading: true }
        case SUBSCRIPTION_SUCCESS:
            return { loading: false, subscriptions: action.payload }
        case SUBSCRIPTION_FAIL:
            return { loading: false, error: action.payload }
        case SUBSCRIPTION_DELETE:
            return {subscription: action.payload}
        default:
            return state
    }
}
