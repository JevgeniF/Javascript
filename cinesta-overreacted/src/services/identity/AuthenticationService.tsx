import axios, {AxiosRequestConfig} from "axios";
import {API_SERVICE_URL} from "../../store/constants";
import {User} from "../../models/identity/User";

export default class AuthenticationService {

    static async SignIn(email: string, password: string) {
        return await axios.post(API_SERVICE_URL + 'identity/account/login', {
            email: email,
            password: password
        }).then(response => {
            console.log('API Sign In status: '  + response.status)
            return response.data
        }).then(data => {
            return data as User
        })
    }

    static async SignUp(firstName: string, lastName: string, email: string, password: string) {
        return await axios.post(API_SERVICE_URL + 'identity/account/register', {
            name: firstName,
            surname: lastName,
            email: email,
            password: password
        }).then(response => {
            console.log('API Sign Up status: '  + response.status)
            return response.data
        }).then(data => {
            return data as User
        })
    }

    static async RefreshTokens() {
        const user = this.RestoreUserFromLocalStorage();
        await new Promise(resolve => setTimeout(resolve, 300))
        const response = await axios.post(API_SERVICE_URL + 'identity/account/refreshtoken', {
            jwt: user.token,
            refreshtoken: user.refreshToken
        }).then(response => {
            console.log('API Token Refresh status: '  + response.status)
            return response.data
        }).then(data => {
            return data as User
        })

        await this.SaveUserToLocalStorage(response);
        return response
    }

    static AxiosJwt(jwt?: string): AxiosRequestConfig | undefined {
        if (!jwt) return undefined;
        return {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        };
    }

    static async SaveUserToLocalStorage(user: User): Promise<void> {
        localStorage.setItem("user", JSON.stringify(user));
        console.log('User saved to local storage')
    }

    static RestoreUserFromLocalStorage(): User {
        console.log('User restored from to local storage')
        // @ts-ignore
        return JSON.parse(localStorage.getItem("user")) as User
    }

}
