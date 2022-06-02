import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "../store/store";
import {AnyAction} from "redux";
import {
    USER_SUBSCRIPTION_DELETE,
    USER_SUBSCRIPTION_FAIL,
    USER_SUBSCRIPTION_REQUEST, USER_SUBSCRIPTION_SUCCESS
} from "../store/constants";
import SubscriptionService from "../services/SubscriptionService";

export const getUserSubscription = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: USER_SUBSCRIPTION_REQUEST
            })

            const subscription = await SubscriptionService.GetUserSubscription()

            dispatch({
                type: USER_SUBSCRIPTION_SUCCESS,
                payload: subscription
            })
        } catch (error) {
            dispatch({
                type: USER_SUBSCRIPTION_FAIL
            })
        }
    }

export const deleteUserSubscription = (subscriptionId: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: USER_SUBSCRIPTION_REQUEST
            })

            await SubscriptionService.DeleteUserSubscription(subscriptionId)

            dispatch({
                type: USER_SUBSCRIPTION_DELETE,
                payload: {}
            })
        } catch (error) {
            dispatch({
                type: USER_SUBSCRIPTION_FAIL
            })
        }
    }
