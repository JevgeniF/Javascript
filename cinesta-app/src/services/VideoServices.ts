import UserServices from '@/services/UserServices'
import axios from 'axios'
import Video from '@/models/Video'

export default class VideoServices {
  static async GetVideos() {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    return await axios.get('videos', axiosJwt)
      .then((res) => {
        return res.data as Video[]
      }).then(data => {
        return data as Video[]
      })
  }
}
