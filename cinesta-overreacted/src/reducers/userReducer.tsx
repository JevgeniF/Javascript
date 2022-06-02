import {User} from "../models/identity/User";
import {
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS
} from "../store/constants";

export interface UserState {
    loading?: boolean
    error?: string
    user: User
}

interface Action {
    type: string
    payload?: string
}

// @ts-ignore
export const userSignReducer = (state: UserState = {user: {}}
    , action: Action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading: true}
        case USER_SIGNIN_SUCCESS:
            return {loading: false, user: action.payload}
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload}
        case USER_SIGNUP_REQUEST:
            return {loading: true}
        case USER_SIGNUP_SUCCESS:
            return {loading: false, user: action.payload}
        case USER_SIGNUP_FAIL:
            return {loading: false, error: action.payload}
        case USER_SIGNOUT:
            return {user: action.payload}
        default:
            return state
    }
}
