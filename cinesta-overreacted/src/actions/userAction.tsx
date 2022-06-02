import {
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS, USER_SIGNOUT,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS
} from "../store/constants";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import { RootState } from "../store/store";
import AuthenticationService from "../services/identity/AuthenticationService";

export const signIn = (email: string, password: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: USER_SIGNIN_REQUEST
            })

            const user = await AuthenticationService.SignIn(email, password)

            dispatch({
                type: USER_SIGNIN_SUCCESS,
                payload: user
            })

            await AuthenticationService.SaveUserToLocalStorage(user)

        } catch (error) {
            dispatch({
                type: USER_SIGNIN_FAIL
            })
        }
    }

export const signUp =
    (name: string, surname: string, email: string, password: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
        async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
            try {
                dispatch({
                    type: USER_SIGNUP_REQUEST
                })

                const user = await AuthenticationService.SignUp(name, surname, email, password)

                dispatch({
                    type: USER_SIGNUP_SUCCESS,
                    payload: user
                })

                await AuthenticationService.SaveUserToLocalStorage(user)

            } catch (error) {
                dispatch({
                    type: USER_SIGNIN_FAIL
                })
            }
        }

export const signOut = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        dispatch({
            type: USER_SIGNOUT,
            payload: {}
        })
        localStorage.removeItem('user')
    }
