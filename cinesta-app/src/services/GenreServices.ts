import UserProfile from '@/models/UserProfile'
import UserServices from '@/services/UserServices'
import axios from 'axios'
import Genre from '@/models/Genre'
import MovieGenre from '@/models/MovieGenre'

export default class GenreServices {

  static async GetGenres () {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    const lang = UserServices.GetCulture()
    return await axios.get('genres' + lang, axiosJwt)
      .then((res) => {
        return res.data as Genre[]
      }).then(data => {
        return data as Genre[]
      })
  }

  static async GetMovieGenres () {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    const lang = UserServices.GetCulture()
    return await axios.get('moviegenres' + lang, axiosJwt)
      .then((res) => {
        return res.data as MovieGenre[]
      }).then(data => {
        return data as MovieGenre[]
      })
  }
}
