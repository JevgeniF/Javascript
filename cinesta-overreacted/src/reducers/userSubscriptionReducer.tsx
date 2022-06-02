import {
    USER_SUBSCRIPTION_DELETE, USER_SUBSCRIPTION_FAIL, USER_SUBSCRIPTION_REQUEST, USER_SUBSCRIPTION_SUCCESS
} from "../store/constants";
import {UserSubscription} from "../models/UserSubscription";

export interface UserSubscriptionState {
    loading?: boolean
    error?: string
    userSubscription: UserSubscription
}

interface Action {
    type: string
    payload?: string
}

// @ts-ignore
export const userSubscriptionReducer = (state: UserSubscriptionState = { userSubscription: {}}
    , action: Action) => {
    switch (action.type) {
        case USER_SUBSCRIPTION_REQUEST:
            return { loading: true }
        case USER_SUBSCRIPTION_SUCCESS:
            return { loading: false, userSubscription: action.payload }
        case USER_SUBSCRIPTION_FAIL:
            return { loading: false, error: action.payload }
        case USER_SUBSCRIPTION_DELETE:
            return {userSubscription: action.payload}
        default:
            return state
    }
}
