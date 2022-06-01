import UserServices from '@/services/UserServices'
import axios from 'axios'
import ProfileMovie from '@/models/ProfileMovie'
import MovieGenre from '@/models/MovieGenre'

import Movie from '@/models/Movie'
import MovieDbScore from '@/models/movieDbScore'
import CastInMovie from '@/models/CastInMovie'

export default class MovieServices {
  static async SaveMovie(movie: Movie): Promise<void> {
    localStorage.setItem("movie", JSON.stringify(movie));
  }

  static GetMovie(): Movie {
    return JSON.parse(<string>localStorage.getItem("movie")) as Movie;
  }

  static async GetMoviesForProfile (profileId: string) {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    const lang = UserServices.GetCulture()
    const movies = await axios.get('profilemovies/' + profileId + lang, axiosJwt)
      .then((res) => {
        return res.data as ProfileMovie[]
      }).then(data => {
        return data as ProfileMovie[]
      })
    const movieGenres = await axios.get('moviegenres' + lang, axiosJwt)
      .then((res) => {
        return res.data as MovieGenre[]
      }).then(data => {
        return data as MovieGenre[]
      })
    movies.forEach(item1 => {
      movieGenres.forEach(item => {
        if (item1.movieDetails.id === item.movieDetails.id) {
          item1.movieDetails.genre = item.genre
        }
      })
    })
    console.log(movies)
    return movies
  }

  static async GetMovieById (movieId: string) {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    const lang = UserServices.GetCulture()
    const movie = await axios.get('movieDetails/' + movieId + lang, axiosJwt)
      .then((res) => {
        return res.data as Movie
      }).then(data => {
        return data as Movie
      })
    const movieGenres = await axios.get('moviegenres' + lang, axiosJwt)
      .then((res) => {
        return res.data as MovieGenre[]
      }).then(data => {
        return data as MovieGenre[]
      })
    movieGenres.forEach(item => {
        if (movie.id === item.movieDetails.id) {
          movie.genre = item.genre
        }
      })
    return movie
  }

  static async GetMovieScore(movieId: string) {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    return await axios.get('moviedbscores/movie=' + movieId, axiosJwt)
      .then((res) => {
        return res.data as MovieDbScore
      }).then(data => {
        return data as MovieDbScore
      })
  }

  static async GetMovieCast (movieId: string) {
    const tokenPromise = await UserServices.Tokens()
    const axiosJwt = UserServices.AxiosJwt(tokenPromise.token)
    const lang = UserServices.GetCulture()
    return await axios.get('castinmovies/movie=' + movieId + lang, axiosJwt)
      .then((res) => {
        return res.data as CastInMovie[]
      }).then(data => {
        return data as CastInMovie[]
      })
  }
}
