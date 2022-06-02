import axios from "axios";
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

    static async SaveUserToLocalStorage(user: User): Promise<void> {
        localStorage.setItem("user", JSON.stringify(user));
        console.log('User saved to local storage')
    }

    static GetUserFromLocalStorage(): User {
        console.log('User restored from to local storage')
        // @ts-ignore
        return JSON.parse(localStorage.getItem("user")) as User
    }

}
