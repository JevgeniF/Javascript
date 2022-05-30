import { Tokens } from '@/models/identity/Tokens'
import { User } from '@/models/identity/User'
import axios, { AxiosRequestConfig } from 'axios'

export default class UserServices {
    static async SaveUser(user: User): Promise<void> {
        localStorage.setItem("user", JSON.stringify(user));
    }

    static GetUser(): User {
        return JSON.parse(<string>localStorage.getItem("user")) as User;
    }

    static async Tokens() {
        const user = this.GetUser()
        const requestData: Tokens = {
            jwt: user.token,
            refreshToken: user.refreshToken
        }
        await new Promise(resolve => setTimeout(resolve, 300))
        const response = await axios.post('identity/account/refreshtoken', requestData)
            .then(res => {
                return res.data as User;
            }).then(data => {
                return data as User
            })
        await new Promise(resolve => setTimeout(resolve, 100))
        await this.SaveUser(response as User);
        return response;
    }

    static AxiosJwt(jwt?: string): AxiosRequestConfig | undefined {
        if (!jwt) return undefined;
      return {
          headers: {
            Authorization: 'Bearer ' + jwt
          }
        };
    }

    static GetCulture() : string {
        const lang = localStorage.getItem("lang");
        return lang ? '?culture=' + lang : '';
    }

    static async Login(email: string, password: string) {
        await axios.post('identity/account/login', { email: email, password: password })
            .then(res => {
              return res.data
            }).then(async data => {
            await this.SaveUser(data)
          }).catch(err => {
              console.log(err)
            })
    }

    static async Register(name: string, surname: string, email: string, password: string) {
      await axios.post('identity/account/register', { name: name, surname: surname, email: email, password: password })
        .then(res => {
          return res.data
        }).then(async data => {
          await this.SaveUser(data)
        }).catch(err => {
        console.warn(err)
      })
  }
}
