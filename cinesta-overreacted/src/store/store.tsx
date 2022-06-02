import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {userSignReducer} from "../reducers/userReducer";
import AuthenticationService from '../services/identity/AuthenticationService';
import {paymentDetailsReducer} from "../reducers/paymentDetailsReducer";
import {subscriptionReducer} from "../reducers/subscriptionReducer";
import {userSubscriptionReducer} from "../reducers/userSubscriptionReducer";

const reducers = combineReducers({
    userSign: userSignReducer,
    userSubscription: userSubscriptionReducer,
    subscription: subscriptionReducer,
    paymentDetails: paymentDetailsReducer,

})

const userFromLocalStorage = AuthenticationService.RestoreUserFromLocalStorage()

const initialState = {
    userSign: {user: userFromLocalStorage}
} as {}

const middleware = [thunk]

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store

export type RootState = ReturnType<typeof store.getState>
