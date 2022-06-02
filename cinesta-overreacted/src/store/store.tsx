import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {userSignReducer} from "../reducers/userReducer";
import AuthenticationService from '../services/identity/AuthenticationService';

const reducers = combineReducers({
    userSign: userSignReducer
})

const userFromLocalStorage = AuthenticationService.GetUserFromLocalStorage()

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
