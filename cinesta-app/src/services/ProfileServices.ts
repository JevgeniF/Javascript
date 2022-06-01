import UserServices from '@/services/UserServices'

import axios from 'axios'
import UserProfile from '@/models/UserProfile'

export default class ProfileServices {
  static async SaveProfile(profile: UserProfile): Promise<void> {
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  static GetProfile(): UserProfile {
    return JSON.parse(<string>localStorage.getItem("profile")) as UserProfile;
  }

  static async GetUserProfiles () {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    return await axios.get('userprofiles', axiosJwt)
      .then((res) => {
        return res.data as UserProfile[]
      }).then(data => {
        return data as UserProfile[]
      })
  }

  static async PostUserProfile (iconUri: string, name: string, age: number) {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    return await axios.post('userprofiles', {
      iconUri: iconUri, name: name, age: age
    }, axiosJwt)
      .then((res) => {
        return res.data as UserProfile
      }).then(data => {
        return data as UserProfile
      })
  }

  static async deleteProfile (id: string) {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    return await axios.delete('userprofiles/' + id, axiosJwt)
      .then((res) => {
        return res.status
      })
  }
}
