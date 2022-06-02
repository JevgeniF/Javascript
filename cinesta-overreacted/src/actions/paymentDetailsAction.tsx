import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "../store/store";
import {AnyAction} from "redux";
import {PAYMENT_DELETE, PAYMENT_FAIL, PAYMENT_REQUEST, PAYMENT_SUCCESS,} from "../store/constants";
import PaymentService from "../services/PaymentService";

export const getPaymentDetails = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: PAYMENT_REQUEST
            })

            const payment = await PaymentService.GetPaymentDetails()

            dispatch({
                type: PAYMENT_SUCCESS,
                payload: payment
            })
        } catch (error) {
            dispatch({
                type: PAYMENT_FAIL
            })
        }
    }

export const deletePaymentDetails = (detailsId: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: PAYMENT_REQUEST
            })

            await PaymentService.DeletePaymentDetails(detailsId)

            dispatch({
                type: PAYMENT_DELETE,
                payload: {}
            })
        } catch (error) {
            dispatch({
                type: PAYMENT_FAIL
            })
        }
    }
