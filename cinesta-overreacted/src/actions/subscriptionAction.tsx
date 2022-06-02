import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "../store/store";
import {AnyAction} from "redux";
import {SUBSCRIPTION_FAIL, SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS} from "../store/constants";
import SubscriptionService from "../services/SubscriptionService";

export const getSubscriptions = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: SUBSCRIPTION_REQUEST
            })

            const subscriptions = await SubscriptionService.GetSubscriptions()

            dispatch({
                type: SUBSCRIPTION_SUCCESS,
                payload: subscriptions
            })
        } catch (error) {
            dispatch({
                type: SUBSCRIPTION_FAIL
            })
        }
    }
