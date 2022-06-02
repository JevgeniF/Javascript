import Profile from "../models/Profile";
import {
    SUBSCRIPTION_DELETE,
    SUBSCRIPTION_FAIL,
    SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS
} from "../store/constants";

export interface ProfileState {
    loading?: boolean
    error?: string
    profile: Profile
}

interface Action {
    type: string
    payload?: string
}

// @ts-ignore
export const profileReducer = (state: ProfileState = { profile: {}}
    , action: Action) => {
    switch (action.type) {
        case SUBSCRIPTION_REQUEST:
            return { loading: true }
        case SUBSCRIPTION_SUCCESS:
            return { loading: false, profile: action.payload }
        case SUBSCRIPTION_FAIL:
            return { loading: false, error: action.payload }
        case SUBSCRIPTION_DELETE:
            return {profile: action.payload}
        default:
            return state
    }
}
