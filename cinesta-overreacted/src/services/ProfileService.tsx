import Profile from "../models/Profile";
import AuthenticationService from "./identity/AuthenticationService";
import axios from "axios";
import {API_SERVICE_URL} from "../store/constants";

export default class ProfileService {

    static async GetProfiles () {
        const refreshedTokens = await AuthenticationService.RefreshTokens()
        const axiosJwt = AuthenticationService.AxiosJwt(refreshedTokens.token)

        return await axios.get(API_SERVICE_URL + 'userprofiles', axiosJwt)
            .then((response) => {
                console.log('API Get User Profiles Details status: '  + response.status)
                return response.data as Profile[]
            }).then(data => {
                return data as Profile[]
            })
    }

    static async PostProfile (iconUri: string, name: string, age: number) {
        const refreshedTokens = await AuthenticationService.RefreshTokens()
        const axiosJwt = AuthenticationService.AxiosJwt(refreshedTokens.token)

        return await axios.post(API_SERVICE_URL + 'userprofiles', {
            iconUri: iconUri,
            name: name,
            age: age
        }, axiosJwt)
            .then((response) => {
                console.log('API Post User Profiles Details status: '  + response.status)
                return response.data
            }).then(data => {
                return data as Profile
            })
    }

    static async deleteProfile (id: string) {
        const refreshedTokens = await AuthenticationService.RefreshTokens()
        const axiosJwt = AuthenticationService.AxiosJwt(refreshedTokens.token)

        return await axios.delete(API_SERVICE_URL + 'userprofiles/' + id, axiosJwt)
            .then((response) => {
                console.log('API Delete User Profiles Details status: '  + response.status)
                return response.status
            })
    }

    static async SaveProfileToLocalStorage(profile: Profile): Promise<void> {
        localStorage.setItem("profile", JSON.stringify(profile));
    }

    static RestoreProfileFromLocalStorage(): Profile {
        // @ts-ignore
        return JSON.parse(localStorage.getItem("profile")) as UserProfile;
    }
}
