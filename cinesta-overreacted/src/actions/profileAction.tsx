import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "../store/store";
import {AnyAction} from "redux";
import {
    PROFILE_DELETE,
    PROFILE_FAIL,
    PROFILE_REQUEST, PROFILE_SUCCESS
} from "../store/constants";
import ProfileService from "../services/ProfileService";

export const getProfiles = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: PROFILE_REQUEST
            })

            const profiles = await ProfileService.GetProfiles()

            dispatch({
                type: PROFILE_SUCCESS,
                payload: profiles
            })
        } catch (error) {
            dispatch({
                type: PROFILE_FAIL
            })
        }
    }

export const deleteProfile = (profileId: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: PROFILE_REQUEST
            })

            await ProfileService.deleteProfile(profileId)

            dispatch({
                type: PROFILE_DELETE,
                payload: {}
            })
        } catch (error) {
            dispatch({
                type: PROFILE_FAIL
            })
        }
    }
